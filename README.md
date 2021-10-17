# parking-lot

quick facts

Objective 
● Develop a simple Webapp using Javascript/Typescript
● The functions should be executable from the developer console
● Provide a simple UI to use the functionality
● Only develop what is explicitly requested - when in doubt ask!

Conditions 
● Write code that works
● Write pretty, readable and well refactored code

Preparations 
● Create a new project and init it as a Git repo
● Make your first commit after you have created the plain project

Rules 
● Make a Git commit at least after every finished task
● Be “fair” - only read the next task after you have committed the results
of the previous task.
● We will talk about your refactoring steps that you have done between
tasks!

Create an application for a parking lot
company with 54 spaces.

You choose which frameworks to use to
create a website where the functions can
be executed in the developer console

When a car enters it gets a ticket and
when the car leaves the ticket will be
returned. The browser is a simulated
ticket machine

------------------------------------------------------------------
task #1

● When a car enters the parking lot a new ticket with a
unique barcode is given out
● Create a function that calculates and returns a new
barcode (16 digits). Save the ticket and time when the
ticket is given out for later reference.
● Add persistence so that tickets are also available after
reloading the web page

getTicket();

------------------------------------------------------------------
task #2

● Before exiting the parking lot the car owner must pay the
fee at the cash-machine. Tickets are identified by the
barcode. First we need to display the price to pay.
● Create a function to calculate the price for the parking
time. Every started hour costs €2.

calculatePrice(barcode);

-------------------------------------------------------------------------

task #3

● When the machine displays the correct price the person
will make the payment with the option of her/his choice
(credit card, debit card, cash). This payment process is
not part of this app.
● Create a function that marks the ticket as paid and saves
the time and payment option used.
● When paid, the function from task #2 should return price
0 and a payment receipt.

payTicket(barcode, paymentMethod);

-----------------------------------------------------------------------

task #4

● To exit the parking lot the ticket must be returned at the
gate.
● The gate opens only
○ if the ticket has been paid (payment is always for a full
hour)
○ if not more than 15min have passed since the payment
otherwise the person needs to make another payment.
● Create a function that returns the state

--------------------------------------------------------------------------





