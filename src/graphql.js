let regeneratorRuntime =  require("regenerator-runtime");
import cors from 'cors';

const request = require('request-promise');

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const nano = require('nano')('http://localhost:5984');

const dbName = 'issue_tracker';
const underDevelopment = true;
let db = null;



const _projects = [
  {
    id: '1111',
    label: 'foo'
  },
  {
    id: '2222',
    label: 'bar'
  }
];

const _issues = [
  {
    projectID: '1111',
    id: '311',
    label: 'foo',
    priority: 1,
    status: 1,
    date: ''
  },
  {
    projectID: '1111',
    id: '312',
    label: 'bar',
    priority: 2,
    status: 2,
    date: ''
  },
  {
    projectID: '2222',
    id: '321',
    label: 'baz',
    priority: 2,
    status: 1,
    date: ''
  }
];




if(underDevelopment) {
  nano.db.destroy(dbName, function() {
    // create a new database
    nano.db.create(dbName, function() {
      // specify the database we are going to use
      db = nano.use(dbName);
      // and insert a document in it

      _issues.map((issue) => {
        db.insert({...issue, type: 'issue'}, issue.id, (err, body, header) => {
          if (err) {
            console.log('[db.insert] ', err.message);
            return;
          }
          console.log('inserted');
          console.log(body);
        });
      });

      _projects.map((project) => {
        db.insert({...project, type: 'project'}, project.id, (err, body, header) => {
          if (err) {
            console.log('[db.insert] ', err.message);
            return;
          }
          console.log('inserted');
          console.log(body);
        });
      });

      db.insert({
        "views": {
          "all-projects": {
            "map": "function (doc) {\n  if(doc.type === 'project') {\n    emit(doc, 1);\n  }\n}"
          }
        },
        "language": "javascript"
      }, '_design/projects', (err, body, header) => {
        if (err) {
          console.log('[db.insert] ', err.message);
          return;
        }
        console.log('inserted');
        console.log(body);
      });

      db.insert({
        "views": {
          "all-issues": {
            "map": "function (doc) {\n  if(doc.type === 'issue') {\n    emit(doc, 1);\n  }\n}"
          }
        },
        "language": "javascript"
      }, '_design/issues', (err, body, header) => {
        if (err) {
          console.log('[db.insert] ', err.message);
          return;
        }
        console.log('inserted');
        console.log(body);
      });

    });
  });
}




const getProjectsFromDB = async () => {
  if(typeof db == 'undefined') return null;
  let url = db.config.url + '/' + db.config.db + '/_design/projects/_view/all-projects';
  let body = await request.get(url);
  return JSON.parse(body).rows.map((p) => { return {...p.key} });
};

const getIssuesFromDB = async () => {
  if(typeof db == 'undefined') return null;
  let url = db.config.url + '/' + db.config.db + '/_design/issues/_view/all-issues';
  let body = await request.get(url);
  return JSON.parse(body).rows;
};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  
  type Query {
    projects: [Project]
    issues(projectID: String): [Issue]
  }
  
  type Mutation {
    createNewIssue(input: IssueInput): Issue
    deleteIssue(id: String!): String
  }
  
  input IssueInput {
    id: String!
    projectID: String!
    label: String!
    priority: Int
    status: Int
    date: String
  }
  
  type Project {
    id: String!
    label: String!
  }
  
  type Issue {
    id: String!
    projectID: String!
    label: String!
    priority: Int
    status: Int
    date: String
  }
  
`);

// The root provides a resolver function for each API endpoint
var root = {

  projects: async () => {
    let _p = await getProjectsFromDB();
    return _p;
  },

  issues: async (args) => {
    let _i = await getIssuesFromDB();
    if(args.projectID != null) {
      _i = _i.filter(i => { if(i.key.projectID == args.projectID) return i; });
    }
    return _i.map((i) => { return i = { ...i.key } });
  },

  createNewIssue: ({input}) => {
    //var id = require('crypto').randomBytes(10).toString('hex');
    let db = nano.use(dbName);
    let issue = input;
    db.insert({...issue, type: 'issue'}, issue.id, (err, body, header) => {
      if (err) {
        console.log('[db.insert] ', err.message);
        return;
      }
      console.log('inserted');
      console.log(body);
    });
    return issue;
  },

  deleteIssue: ({id}) => {
    let db = nano.use(dbName);
    db.get(id, (err, body, header) => {
      db.destroy(id, body._rev, (_err, _body, _header) => {
        if (_err) {
          console.log('[db.delete] ', _err.message);
          return;
        }
        console.log('deleted');
        console.log(_body);
      });
    });
    return "delete=ok";
  }

};

const app = express();
app.use('*', cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

export default app;
