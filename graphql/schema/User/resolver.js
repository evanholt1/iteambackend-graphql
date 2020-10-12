const { isValidObjectId } = require('mongoose');
const { UserInputError } = require('apollo-server-express')

const User = require('../../../models/user');


module.exports = {
    Query: {

    },
    Mutation: {
        signup: async (_, signupInput, context) => {
            return context.models.User.signup(signupInput);
        },

        signin: async(_, signinInput, context) => {
            return context.models.User.signin(signinInput, context.req);
        },

        protectedRoute : async (_,__, {req} ) => {
            const user = await User.findOne({ email: signinInput.email }).lean().exec();
  
            if(!user) 
                return null;
            
            req.session._id = user._id;
            req.session.sessionDuration = 1000;
            req.session.loginDate = Date.now();
        
            return user;
        },
        test: async (_,__, {req,res}) => {

            console.log(req.signedCookies["US"])
            // // if user doesnt have a populated session. _id is just a common field to put in the session
            // if(!req.session._id) 
            //     return null;
            
            // let { id, cookie, loginDate, ...info } = req.session;
                        

            // let timeDifference = Date.now() - loginDate;

            // // if more time has passed than the sessionCookieDuration
            // if(timeDifference > info.sessionDuration) {
            //     res.clearCookie("US"); 

            //     await regeneratePromise(req); // makes a new empty session server-side
            
            //     Object.assign(req.session, info); // adds previous session data

            //     req.session.loginDate = Date.now(); // adds a new loginDate (now)
 
            //     // updates the long maxAge(refresh token) as to remain the same as the old session
            //     req.session.cookie.maxAge = (1000 * 60 * 60 * 24) - timeDifference;

            //     req.session.sessionDuration = 1000;
                
            //     // ensures the server-side session is stored in the DB
            //     await saveSessionPromise(req);
            
            //     // updates the id of the client-side cookis
            //     res.cookie(
            //         'US', 
            //         req.session.id
            //     );
            
            //     return null;
            // }
        },
        regenerateSession : async(_,__,{req,res}) => {
            return regenerateSession(req,res);
        }
    }
};

const regenerateSession = async(req,res) => {
    res.clearCookie("US");

    await regeneratePromise(req);

    await saveSessionPromise(req);

    res.cookie(
        'US', 
        req.session.id
    );

    return null;
}

// because Graphql doesnt run well with callbacks (causes HTTP HEADERS ALREADY SENT error)
async function runRegenerateSession(req) {
    return req.session.regenerate(function(){
        req.session._id = '5';
        req.session.test = "fuck this package";
    });
}

// const regenerateSession = (req,res) => {
//     return new Promise(() => {
//            req.session.regenerate( () => {
//                 resolve();
//            })
//         })
// }
// function regenerateSession(req,res) {
//     return req.session.regenerate(function(){
//         req.session.test = "test working thus far";
//         console.log(`regenerate session id ${req.session.id}`);
//         req.session.save(function(){
//             return;
//         })
//     });
// }
async function runSaveSession(req) {
    return req.session.save(function(){});
}

async function saveSession(req) {
    return req.session.save(function(){
        console.log(`save session id ${req.session.id}`)
    });
}

const regeneratePromise = (req) => {
    return new Promise((resolve,reject) => {
        req.session.regenerate(function(err) {
            if(err) reject(null)
            resolve(null);
        })
    })
}

const saveSessionPromise = (req,res) => {
    return new Promise((resolve,reject) => {
        req.session.save(function(err) {
            if(err) reject(null);
            resolve(null);
        });
    });
}