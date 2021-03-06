/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var config = {
  detailedErrors: false
, hostname: '0.0.0.0'
, port: process.env.PORT
, model: {
    defaultAdapter: 'postgres'
  }
//gap3 database
, db: {
  postgres: {
    user: 'opmzgednrndpue'
  , database: 'd7e8an15dsl5cn'
  , password: 'ZtQZAJBAy6To9Dciw-Rt3HsfOh'
  , host: 'ec2-54-243-223-227.compute-1.amazonaws.com'
  , port: 5432
  }
}
//gap2 database
// , db: {
//     postgres: {
//       user: 'gqfslnsegogdzu'
//     , database: 'd2t1b76rgqatiu'
//     , password: 'd-kfQtcYYgKth2mzPG6W94E54N'
//     , host: 'ec2-54-243-48-107.compute-1.amazonaws.com'
//     , port: 5432
//     }
//   }
, socketIo: true
, realtime: true
//thawing-hamlet database
// , db: {
//     postgres: {
//       user: 'hhcxftfrwwfumx'
//     , database: 'd7t748s19klgo1'
//     , password: 'ZgZJDlEnjraoq-1XR23phpBhup'
//     , host: 'ec2-54-243-62-232.compute-1.amazonaws.com'
//     , port: 5432
//     }
//   }
, sessions: {
  store: 'memory'
, key: 'sid'
, expiry: 14 * 24 * 60 * 60
}
};

module.exports = config;


