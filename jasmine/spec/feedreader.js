/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
        Test for allFeeds.url to be defined and not empty
        */
        it('URL should be defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /*
        Test for allFeed.name to be defined and not empty
        */
        it('Name should be defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });


    /*
        Test suit for the menu
    */
    describe("The menu", function () {
        var menu = $("body").hasClass("menu-hidden");
        var i = 0;

        it("should be hidden by default", function () {
            //when the page is loaded, i is instantiated to zero
            //meaning that it is an iniatial load and the menu must
            //be hidden
            expect(i).toBe(0);
            expect(menu).toBe(true);
        });


        it("should toggle visibility when clicked", function () {
            //when the menu is now being clicked, the var i begins to 
            //increment, odd numbers means the menu is visible while
            //even numbers means the menu is hidden.
            $(".menu-icon-link").click(function () {
                i++;
            });

            if (i % 2 !== 0) {
                expect(menu).toBe(false);
            } else {
                expect(menu).toBe(true);
            }
        });

    });

    /*
        Test suit for the initial entries
    */
    describe("Initial Entries", function () {
        var content, len;
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it("should have at least one .entry element within the .feed container", function (done) {
            //grab the values after asynchronous load
            content = $(".entry");
            len = content.length;
            expect(len).toBeGreaterThan(0);
            done();
        });

    });



    /*
        Test suit for the New feed Selection
    */
    describe("New Feed Selection", function () {

        var firstFeedHref, secondFeedHref;
        beforeEach(function (done) {
            loadFeed(0, function () {
                //grab the firstFeed a tags 
                firstFeedHref = $(".feed a");
                loadFeed(1, done);
            });

        });

        it("should be able to change content", function (done) {
            secondFeedHref = $(".feed a");

            for (var i = 0; i < secondFeedHref.length; i++) {
                for (var j = 0; j < firstFeedHref.length; j++) {
                    expect(secondFeedHref[i].href).not.toBe(firstFeedHref[j].href);
                }
            }
            done();
        });


    });


}());