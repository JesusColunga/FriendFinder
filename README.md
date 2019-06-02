# Friend Finder - Node and Express Servers
This is a compatibility-based "FriendFinder" application -- basically a dating app. 



This full-stack site will take in results from your users' surveys, then compare their answers with those from other users. 



The app will then display the name and picture of the user with the best overall match.



The directory structure to run the app should be like this:

```
FriendFinder
  - .gitignore
  - app
    - data
      - friends.js
    - public
      - home.html
      - survey.html
    - routing
      - apiRoutes.js
      - htmlRoutes.js
  - node_modules
  - package.json
  - server.js
```

### 

Data is kept in a "friends.js" file, which must be initialized first time with:

[ ]