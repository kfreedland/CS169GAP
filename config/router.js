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


var router = new geddy.RegExpRouter();

router.get('/').to('Main.index');

// Basic routes
// router.match('/moving/pictures/:id', 'GET').to('Moving.pictures');
//
// router.match('/farewells/:farewelltype/kings/:kingid', 'GET').to('Farewells.kings');
//
// Can also match specific HTTP methods only
// router.get('/xandadu').to('Xanadu.specialHandler');
// router.del('/xandadu/:id').to('Xanadu.killItWithFire');
//
// Resource-based routes
// router.resource('hemispheres');
//
// Nested Resource-based routes
// router.resource('hemispheres', function(){
//   this.resource('countries');
//   this.get('/print(.:format)').to('Hemispheres.print');
// });

router.get('/login').to('Main.login');
router.get('/logout').to('Main.logout');
router.post('/').to('Auth.local');
router.get('/users/profile').to('Users.profile');
router.get('/users/usernames').to('Users.getUsernames');
// router.post('/TESTAPI/unitTests').to('Main.unitTests');

router.post('/activities/create').to('Activities.add');
router.get('/activities/search').to('Activities.search');
router.get('/activities/activitydetail').to('Activities.detail');
router.get('/activities/getactivitybyid').to('Activities.getActivityById');

router.post('/events/adduserstoevent').to('Events.addUsersToEvent');
router.post('/events/create').to('Events.add');
router.post('/events/changedatetime').to('Events.changeDateTime');
router.get('/events/getmyevents').to('Events.getMyEvents');
router.get('/events/createnew').to('Events.createNewEvent');
router.get('/events/myevents').to('Events.myEvents');
router.get('/events/eventdetail').to('Events.detail');

// router.get('/auth/twitter').to('Auth.twitter');
// router.get('/auth/twitter/callback').to('Auth.twitterCallback');
router.get('/auth/facebook').to('Auth.facebook');
router.get('/auth/facebook/callback').to('Auth.facebookCallback');
// router.get('/auth/yammer').to('Auth.yammer');
// router.get('/auth/yammer/callback').to('Auth.yammerCallback');
router.resource('users');

//router.resource('activities');

router.resource('events');
router.resource('comments');
exports.router = router;
