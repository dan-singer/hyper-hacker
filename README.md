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
- completionTimes (Array<Number>) <-- Defaults to -1 if not completed

## API
**/login**
- GET
    - Returns the login page
- POST
    - 

