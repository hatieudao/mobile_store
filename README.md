## Project Web

### Start working
+ `git clone https://github.com/hatieudao/mobile_store.git `.
+ `cd mobile_store`.
+ `npm install` or `yarn`
+ `git checkout -b <branch name>`.
+ **branch name format `feature/<name>`, example `feature/user-crud`**

### Run project
+ run `npm run dev`.

### Naming convention
+ **Controller** : `<name-controller>.controller.js`.
+ **Route** : `<name-route>.route.js`
+ **Middleware** : `<name-middleware>.middleware.js`
+ **Variables follow camelcase: `orderTotal`, `getTotalOfOrder`, ...**
### Push code
+ `npm run lint:fix`
+ Fix bug if have
+ `git push origin <branch-name>`
+ Create pull request, add reviewer, send a message on FB
### Config DB
+ Install postgresql [here](https://www.postgresql.org/download/)
+ Start service `postgresql-x64-14`.
+ Run file `mobile_store.sql` and `add_data.sql` if this's the first run.
  
### DB description
+ A `mobile` has many `specifications`, such as chipset, pin, screen,...
+ `capacities` : 64 GB, 128 GB,...
+ `options` include a `mobile`, a `capacity`, and something more such as color, special model. Example `iPhone 13 128GB black`
