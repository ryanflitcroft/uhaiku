# uhaiku

Build a React/Supabase Full Stack app following domain and architecture guidelines.

## Deployment Requirements

Standard deployment. While encouraged, you are not required to create separate supabase environments.

## Domain Requirements

- Pick a topic for your app
- You will be using a list/detail/edit pattern
- Your "item" should have data that will only be loaded in detail view

### Authentication Requirements

Your app needs to have authenticated users. Having supplemental profile information is optional.

Your app should not allow non-authenticated visitors to view pages with data. Reuse existing boilerplate modules and patterns (like `<PrivateRoute/>`). When it doubt, go look at how you did it before (or a demo).

The header of your app should display the email (or name if you are using profiles) of the authenticated users and provide a way to sign out of the application

### Detail/List Requirements

- Your items will be "owned" by the user that created them
- Your list page should have an "add new" option to link to add page
- In the detail view
    - If the item is owned by the current user
        - Show the edit and delete options
    - If not owned by the current user
        - Show the copy option
        - Copy
            - should create a new item with same data except new user
            - Redirect to edit view after creation
            - or
            - call add and prepopulate form fields with values from copied object
- When loading the edit view
    - check that the item is owned by the current user
    - Redirect to the detail view if not

### Supabase

Create a supabase instance for your project.

Will not required, you are encouraged to set up RLS to match the requirements outlined above (in a "real" app this would be more important)

## Architecture Requirements

Except for local component state (UI state), there should be no react hooks in your components

Your User/Auth and List state should be stored in Context Providers and used globally. Use a reducer to manage lists of items.

Your Detail item can be stored in a custom hook with "useState" and live at the page level

Put your hooks in their own files. All domain state and actions being provided to components need live in your hooks.

## Testing Requirements

There are no automated testing requirements. You will need to manually test your app for correctness.

## Stretch Goals Ideas

- Make the list searchable. Store the search state in the url using the router
- Add centralized notification and loading functionality
- Add a lookup table used by your item:
    - Load the lookup in a Context Provider
    - Resolve the id in the list and detail views from the stored list
    - Create another page for adding (and possibly editing) items to the lookup
- Finding a cool React library for drawing, sound, or other more complex data (needs to be serializable) for your item detail view

## Rubric

| Task                                                                  | Points |
| --------------------------------------------------------------------- | ------ |
| Follows Archtectural Requirements                                     | 8      |
| Follows User/Authentication Guidelines                                | 10     |
| Fullfills Detail/List Requirements                                    | 20     |
| Deployed                                                              | 2      |


