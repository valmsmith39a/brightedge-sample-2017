# JavaScript Data Table

### Hosted here: https://valmsmith39a.github.io/brightedge-sample-2017/

### To run locally:
- git clone https://github.com/valmsmith39a/brightedge-sample-2017.git
- Command line in terminal: `python -m SimpleHTTPServer 3000`
- Open browser to http://localhost:3000/
- To exit server, hit `Control-C` two times

### To Test:
- When user first loads the page, table displays Star Wars characters' names and heights.
- User can Show/Hide table.
- User can Sort by Name (refresh page to reset).
- User can edit name by clicking into the `name` field and then clicking the corresponding `Save Edits` button in the same row. If user refreshes, the new name persists.
- User can click on `Prev` and `Next` to page through the different pages. Numerical navigation is not currently functional.
- No reset implemented, so to clear data stored in browser using `localStorage`, user needs to open up `Chrome dev tools` -> `Application` -> `Local Storage` -> Click on `Clear All` to remove local storage data.
