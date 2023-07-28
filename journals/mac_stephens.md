A Note: As I mentioned to Candice, in the spirit of learning, we traded off sharing screens and group coding on most days. As you'll see reflected below, there were few days when we were off tackling our own issues until the very end of the project. 


6/25 - 6/26
    We started by creating our PinTrip wireframe and talked through the functionality of the website. 
6/27
    After creating our Issues and starting to work on our models, we realized that the drop-bucket connection would need to be many to many, which required us to go back to the wireframe and talk through foreign keys. Learned a bunch today about many to many.
6/28
    Today we decided we'd go with just SQL, forgoing migrations. We created our Docker-compose.yml 

7/8
    Today we worked on our API structure, changing our wireframe around a bit. We started looking at our authentication and authorization.

7/11
    It was authentication and authorization day for the team. We had to navigate the differences with our code because we weren't using migrations. This was my first real hands on experience with FastAPI, and it definitely is going to take some getting used to.

7/12
    Today we added completed our authorization. We have tokens! Then we started working on our API. I began with buckets, walking through a get and create function with Amanda. 

7/13
    Countinued working on our API. Today we were able to get almost all of the functionality done.

7/14
    We finished up the backend today (or at least for now), and we started to build the front end, starting with authentication. We're trying to use Redux, so we'll see how that goes. 

7/17
    Today I worked with Amanda to make allow for users to only see buckets that are attached to your account. I also added client id and username to bucket drops.

7/18
    I worked on the backend to add our PUT statements and make some tweaks.

7/19
    Worked on the onClick for the profile page and started to work on editing and updating. 

7/20
    Today Amanda and I finished the drops page, which was great. We're working on adding dropdown functionality for all of the elements on the page. 

7/24
    We needed to finish up troubleshooting some of the errors we're getting when we are creating and deleting drops. Also, today we wrote in page refresh functionality for onSubmit and account-based hiding or revealing of elements. Had to touch the join table quite a bit.

7/25
    I started prepping for CI today, reading through the docs again and watching Dalonte's talk on it. I also dealt with some CSS issues with Brian. 

7/26
    Today was all CI and it took all day, but we got everything working by 6.

7/27
    About the same as yesterday, it took almost all day, but we deployed! We are having an openSSL issue, but we expected it because we haven't added a legitimate key.

7/28
    Last day! At least until stretch goals. We flopped today when Candice came in but then realized it was because I was tinkering with our http/https stuff. So that was an easy fix. We went through and made sure we cleaned everything up and then updated our version and deployed again. 















