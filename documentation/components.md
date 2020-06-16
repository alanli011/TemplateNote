# Frontend Components

- /
  - Landing page
  - Basic info on what the app is supposed to be about
  - animate some typing text
- /home
  - Home page after logging in through Auth0
  - Will include a tab bar navigation on the left
    - **Tabs**
      - Notebook (dropdown)
      - Notes
        - **Subtabs**
          - New Note
          - [List of tabs]
      - Tags
      - Logout
      - Dark mode / light mode toggle

- /notebooks
  - display all notebooks in some kind of ui design
- /notebook/id
  - Extra tab navigation on the side to display all the notes in the notebook
    - include tags
  - Add new note button

- /notebook/id/notes/id
  - React-Quill component to render rich text editor
  - delete button
  - save button

- /templates
  - displays all the available templates to choose from in card form
  - create new template button

- /tags
  - displays all tags
  - create new tag button

- /tags/id
  - displays all notes with associated tag
