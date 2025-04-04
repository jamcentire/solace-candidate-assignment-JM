Future improvements:

1. Change the type of phone number in the database to string - there is no use case that I can think of where we need to use it as a number, and it will make it easier to operate on.
2. Add the ability to sort our results based on the field value. This is specifically useful for targetting years of experience, although can also be useful for alphabetizing city/name/etc.
3. Put the table in a Grid so that we can manipulate header and body positioning in one coordinated action
4. Lots of styling upgrades in general: gridlines to separate table cells, Better box sizing for the table elements so that we don't get things crammed in in an ugly way. Eventually, the table cells should all be the same size, and any text that doesn't fit into a cell (specialities, e.g.) should be shortened to show the first X characters, and have the rest visible on a mouse hover.
5. Create functional components for elements that get reused (body cells, e.g.) so that we don't have to enter the className on each individually.
6. Change rendering scheme for page to load piecewise on scroll-down only; this prevents a render with tens of thousands of elements from blocking the user from seeing anything until it is finished.
7. Expand the search to allow filtration on specialties, outside of the normal text search field. I.e., they can select one or more specialties to filter on in addition to the text search.
