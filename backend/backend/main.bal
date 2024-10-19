import ballerina/http;
import ballerinax/mongodb;
import ballerina/log;

type User record {
    string username;
    string password;
};
type Service record {
    string username;
    string phoneNumber;
    string email;
    string location;
    string password;
};



mongodb:Client mongoDb = check new ({
    connection: {
        serverAddress: {
            host: "localhost",
            port: 27017
        }
    }
});

service /signup on new http:Listener(8080) {
    mongodb:Database userDb;
    mongodb:Collection userCollection;
    mongodb:Collection serviceCollection;
    
    function init() returns error? {
        self.userDb = check mongoDb->getDatabase("userDB");
        self.userCollection = check self.userDb->getCollection("userCollection");
        self.serviceCollection = check self.userDb->getCollection("serviceCollection");
        
    }
    resource function post signup(http:Caller caller, http:Request req) returns error? {
        // Parse the JSON payload from the request body
        json signuppayload = check req.getJsonPayload();
        User userDetails = check signuppayload.cloneWithType(User);

        // Check if the user already exists in the collection
        map<json> filter = {username: userDetails.username};
        stream<User, error?> userStream = check self.userCollection->find(filter);
        if (userStream.next() is record {| User value; |}) {
            log:printError("User already exists");
            http:Response conflictResponse = new;
            conflictResponse.setTextPayload("User already exists");
            check caller->respond(conflictResponse);
            return;
        }

        // Insert the new user into the MongoDB collection
        check self.userCollection->insertOne(userDetails);

        // send a sucess response
        http:Response response = new;
        response.setTextPayload("User signed up successfully");
        check caller->respond(response);
    }



        // Login service
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json loginPayload = check req.getJsonPayload();
        User loginDetails = check loginPayload.cloneWithType(User);

        // Check if the user exists and password matches
        map<json> filter = {username: loginDetails.username};
        stream<User, error?> userStream = check self.userCollection->find(filter);
        var userResult = userStream.next();

        if (userResult is record {| User value; |}) {
            if (userResult.value.password == loginDetails.password) {
                http:Response successResponse = new;
                successResponse.setTextPayload("Login successful");
                check caller->respond(successResponse);
            } else {
                http:Response unauthorizedResponse = new;
                unauthorizedResponse.statusCode = 401;
                unauthorizedResponse.setTextPayload("Invalid credentials");
                check caller->respond(unauthorizedResponse);
            }
        } else {
            http:Response notFoundResponse = new;
            notFoundResponse.statusCode = 404;
            notFoundResponse.setTextPayload("User not found");
            check caller->respond(notFoundResponse);
        }
    }
    resource function post signupservice(http:Caller caller, http:Request req) returns error? {
        // Parse the JSON payload from the request body
        json signuppayload = check req.getJsonPayload();
        Service userDetails = check signuppayload.cloneWithType(Service);

        // Check if the user already exists in the collection by username
        map<json> filter = {username: userDetails.username};
        stream<Service, error?> userStream = check self.serviceCollection->find(filter);

        if (userStream.next() is record {| Service value; |}) {
            log:printError("Service already exists");
            http:Response conflictResponse = new;
            conflictResponse.statusCode = 409;
            conflictResponse.setTextPayload("Service already exists");
            check caller->respond(conflictResponse);
            return;
        }

        // Insert the new user with all the details into the MongoDB collection
        check self.serviceCollection->insertOne(userDetails);

        // Send a success response
        http:Response response = new;
        response.setTextPayload("Service signed up successfully");
        check caller->respond(response);
    }

    // Login resource function
    resource function post loginservice(http:Caller caller, http:Request req) returns error? {
        json loginPayload = check req.getJsonPayload();
        Service loginDetails = check loginPayload.cloneWithType(Service);

        // Check if the user exists and password matches
        map<json> filter = {username: loginDetails.username};
        stream<Service, error?> userStream = check self.serviceCollection->find(filter);
        var userResult = userStream.next();

        if (userResult is record {| Service value; |}) {
            if (userResult.value.password == loginDetails.password) {
                http:Response successResponse = new;
                successResponse.setTextPayload("Login successful");
                check caller->respond(successResponse);
            } else {
                http:Response unauthorizedResponse = new;
                unauthorizedResponse.statusCode = 401;
                unauthorizedResponse.setTextPayload("Invalid credentials");
                check caller->respond(unauthorizedResponse);
            }
        } else {
            http:Response notFoundResponse = new;
            notFoundResponse.statusCode = 404;
            notFoundResponse.setTextPayload("Service not found");
            check caller->respond(notFoundResponse);
        }
    }
}
