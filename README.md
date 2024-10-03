# Ukiyo App 
https://code-with-me.global.jetbrains.com/6glNYlZY9TVfdfTXgOhzag#p=WS&fp=27F6F56E108064B5804149F9DB594C9537725CDCF55A1103D7AFADFEDBE4504A&newUi=true

Create a new project with Angular 15 and add Bootstrap 5.
Using bootstrap you would have to create a nested table.
- It would have the following columns
  1. Select column (a column with a checkbox) - the checkbox from the table header would select all the rows.
  2. Name
  3. Type
  4. Email
  5. Phone Number
  6. Company Name

- To collapse/expand a row, you will have to click on the arrow next to the second column (*** Name ***) - https://icons.getbootstrap.com/icons/arrow-right-short/
  - The row would rotate 90deg when it's expanded
- The nesting should be infinite. (no extra components here, everything should be done in the same component)
- Selecting a row
  - In the first column, you would have a checkbox that could be selected.
  - The moment at least one checkbox is selected, we need to hide all the `buttons` for the hovering state
  - Change the table header and show a `Delete multiple` buttons in case we have at least one row selected.

- Hovering:
  - When you hover over a row, the row color would be slightly darker
- when you hover on a first level row, you will have the following buttons: Delete, Edit (they don't have to be connected to a function)
- When you hover on the second level+ row, you should only see the Delete button (they don't have to be connected to anything)
- Search:
  - Add a field above the table that would let you search by `name` in the whole table.
  - The search should be done with a debounce
  - the search would only show in view the rows that have a name that contains the string from the search field
  - if a child for a row has a matching search for a name, show all the parents

- Resize - Create a directive that will be used in the table header, and that directive should let you resize the whole column when dragging on a rectangle div.
