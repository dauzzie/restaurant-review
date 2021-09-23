# Restaurant Review

Restaurant Review App

## Description

---

A React-based web application for storing reviews for restaurants with shallow user interfaces.

## Tech Stack Used

---
Express, Mongo Atlas, React, Cors, Node, Bootstrap, Axios, Mongoose

## Things Learned

---

1. Javascript Promises chaining - Promises can be chained through `.then` and the return values could be passed down to the next `.then` chain
2. Connecting multiple routes using `react-router-dom` requires `Link` usage to allow state objects from `useState` persist throughout other routes
3. Manage `async`s and `await`s wisely and prevent Promises anti-pattern (nesting vars, creating Promise within a Promise, concurrency (use `Promise.all`) )
4. Use Mongoose, it's much simpler to deal with.
5. React Hooks - available for only _functional_ components rather than _class_ ones.
   1. Old class versions:
      1. `componentDidMount()` -> instance being _created_ and _inserted_ into the DOM
      2. `componentDidUpdate()` -> called when being _re-rendered_
      3. `componentWillUnmount()` -> called when being _removed_ from DOM
   2. New _functional_ comps ones:
      1. `useState` - returns `[var, setter]` with param `initVal` and `var` as _current_ value
      2. `useEffect` - takes in a function, performs similar as `componentDidMount` and `componentDidUpdate` together (runs after every render) and can _return_ a function to cleanup (`componentWillUnmount`)
      3. A URL request could have 3 components (important ones) : `params` (after `/`), `query` (after `?`) and body (in body).

## Questions

---

- How do indexes work in Mongo?
- MongoDB security practices?
- What does next do in Promises?
- `state` vs `props`?
- Important features of a frontend framework?
- What is `React.createRef` and `React.createContext`?
- Proxying to backend? Meaning?
- Aggregation pipeline in Mongo? Other DBs?

## Suggestions for Improvement

---

- Try adding `Formik` for forms
- User authentication
- Backend security

## References

--- 

[MERN Course on FreeCodeCamp](https://www.youtube.com/watch?v=mrHNSanmqQ4&t=7393s)



#### Created by Dausie @ 2021-09-22
