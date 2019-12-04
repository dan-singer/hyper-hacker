# Hyper Hacker
Hyper Hacker is a puzzle-game web application which features HTML, CSS, and JavaScript puzzles, as well as a user login system.

## Models
**Account**
- username (String)
- salt (Buffer)
- password (String)
- createdDate (Date)
- isPremium (bool)
- profilePic (???)
- completionTimes (`Array<Number>`) 
    - Index i represents the completion time for level i.
    - Make sure this defaults to an array of length N, where N represents the number of levels. 
    - Each elements should be initialized to zero, to indicate an incomplete level.
- startTime (Number)
    - Represents the time the user started a level
- completedTutorial (bool)
- `canAccessLevel(user, level)`
    - static function used to determine if a user is able to access the provided level. For now, we'll say if level is less than 4, return true. If level is >= 4 and the user isPremium, return true. If level is >= 4 and the user is not premium, return false. 
- `completeLevel(user, level, endTime)`
    - static function that will mark a time in the completionTimes array using level as an index.
- `completeTutorial(user)`
    - Marks off that the tutorial is now complete

## Data Files
**levels.json**
- Contains the keys for each level stored in a JSON array.
```js
[
    "key0",
    "key1",
    //...
]
```

## Views
- signup
- login (home page)
- level select
- tutorial
- levels 0-5
    - Level 0: Overflowing with Secrets
        - All of the page's overflow is hidden, try to find the buttons outside of your normal range.
    - Level 1: No Context
        - Bully Canvas elements into giving you their secrets.
    - Level 2: You've Been Reinstated
        - It's hard to move stuff around when your work keeps getting reset.
    - Level 3: I get by with a little /help from my friends
        - Sometimes you need to reach out to other pages to succeed.
    - Level 4: JS Console Adventures
        - You have my sword, and my bow, and my axe.
    - Level 5: Gotta Go Fast
        - Oh wait, you wanted to be able to CLICK these elements?
    - Level 6: WebVR [Dan]
    - Level 7: Art Class [Emily]
    - Level 8:  [Emily]
    - Level 9:  [Emily]
    - Leaderboard: [Dan]

### React Conversion 
- Because of the nature of levels 0, 2, 5, and tutorial, they will not be converted to React components.
- Dan
    - Help
    - level-select
    - 1 
    - 3
    - 4
- Emily
    - login
    - signup

## API
**/login**
- GET
    - Returns the login page
    - Query parameters: none
    - Request body: none
- POST
    - Returns a status code depending on the status of the login
    - If the login was successful, returns a 200 status code.
    - If the login is missing payload data, return 400 status code with an error code.
    ```js
    {
        "error": "missing-data"
    }  
    ```
    - If the login info is invalid, return 401 status code with an error code.
    ```js
    {
        "error": "invalid-credentials"
    }
    ```
```js
// Example request body
{
    "username": "abc123",
    "pass": "example"
}
```

**/signup**
- GET
    - Returns the signup page 
    - Query parameters: none
    - Request body: none
- POST
    - Returns a status code depending on the status of the signup
    - If the signup was successful, return a 200 status code
    - If the payload is missing data, return 400 status code with an error code.
    ```js
    {
        "error": "missing-data"
    }
    ```
    - If the payload's password's do not match, return 400 status code with an error code.
    ```js
    {
        "error": "password-mismatch"
    }
    ``` 
    - If the username is already taken, return 400 status code with an error code.
    ```js
    {
        "error": "username-taken"
    }
    ```
```js
// Example Request Body
{
    "username": "abc123",
    "pass": "example",
    "pass2": "example"
}
```

**/logout**
- GET
    - Logs the user out and redirects them to the homepage.
    - Query parameters: none
    - Request body: none

**/level-select**
- GET
    - If the user is logged in, returns the level-select page pre-filled with user data using Handlebars.
    - If the user is logged out, redirects to the login page

**/tutorial**
- GET
    - If the user is logged in, returns the tutorial page pre-filled with user data using Handlebars.
    - If the user is logged out, redirects to the login page
- POST
    - If the user is logged in, marks the tutorial off as being completed and returns a 200 status code.
    - Otherwise, redirects to the login page

**/level**
- GET
    - If the user is logged out, redirects to the login page, otherwise...
    - Returns the requested level page pre-filled with user data using Handlebars.
    - Requires query parameter specifying the zero-based level number
    ``` 
    /level?num=0
    ```
    - The server should validate that the user can access this level, and check that the level actually exists. 
    - If the user is not eligible to view this level, or the level does not exist, redirect to `/level-select` 
    - Assuming the level is valid, the server should cache the time the request was sent, and store it in the user's account
- POST
    - Marks the level off as being completed.
    - Requires query parameter specifying the zero-based level number
    ``` 
    /level?num=0
    ```
    - When the server receives the request, it should compare the current time with the startTime cached in the user's Account model. The delta can be stored in the completionTimes array for this level. 