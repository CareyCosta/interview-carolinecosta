#A description of your solution at a high-level, including any libraries or techniques used, roughly how it works, etc:

I structured the project into two general folders: 

*Pages:

** Home Page: where a user can search for a github user name and view a list of gists from that user.

** Gist Details Page: where a user can view all the files within a gist, as well as add and remove files to their list of Favorites

** Favorites Page: where a user can view all their favorite gists as well as add and remove gists from the list


*Components: These are reusable components that are used more than once or appear across multiple pages

** File: Displays the information of a file within a Gist (used in the Gist Details page and the Favorites page)

** Navigation: always visible across the application, allows the user to navigate between the Home and Favorites pages


Data Fetching:

All API calls are stored in the repository.ts file. For simplicity I opted to use the JS Fetch API as opposed to axios.


State Management:

In order to allow data to persist across pages, I store the necessary data state in the App component and pass it via props to the Home, Gist, and Favorites components. 


Viewing Gist Details:

Initially, all files are truncated, but the user can click a "See more" button which opens the entire file in a modal, which can then be closed. This is done using CSS by adjusting things like maxHeight, postion, zIndex, and applying a class name to the body in order to prevent background scolling when the modal is open.


Favorites:

Files can be added and removed from the Gist Details page as well as the Favorites page. Users also have the ability to view the original gist that a file originated from, as well as expand the view of the file. If files are added from multiple authors, the list of Favorites will be categorized by the user.


#What trade-offs you made:

I would have used Next.js because it includes Routing as well as server-side rendering, static site generation, and would be better for performance optimizations, but for the project but wanted to be mindful of time and prioritize the deliverables. I used create-react-app with tyepscript, using Next.js would have taken longer simply because I'm less familiar with it and would require a bit of research.
A state management library such as zustand could be an improvement and would be best if the project were to scale, but for the given requirements this didn't feel necessary.


#What changes you would make if you had more time:

I kept accessibility in mind for this project but given more time I would improve certain areas, such as the File modal: keyboard focus should automatically be applied to the first focusable element and be trapped within the modal. 
I would have used Next.js because it includes Routing as well as server-side rendering, static site generation, and would be better for performance optimizations, but for the project but wanted to be mindful of time and prioritize the deliverables. Using Next.js would have taken longer simply because I'm less familiar with it and would require a bit of research.


#What you would change if you built this for production:

Although unit tests were not required, I included one suite of tests for the Home page. For production, I would add an end-to-end test using Cypress for the "happy path" and more unit tests to cover the individual component functionalities and edge cases.
Error handling and loading states could also be improved.
I would also be sure to perfect certain keyboard interactions for accessibility (see above).


#What parts of the spec were completed, how much time you spent, and any particular problems you ran into:

Completed:
* Retrieve a user's gists
* View gist details on separate page
* Ability to maintain a list of Favorite files

Time Spent: ~3 hrs
