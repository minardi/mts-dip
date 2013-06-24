describe("Tickets Collection", function() {

	beforeEach(function(){
     var model = new TicketModel();	
      
      tickets = new TicketsCollection();
      
      model.set({user_id:3,data:"27_01_12"});

      tickets.push(model);


    });

    it("should have urlRoot eq tickets", function() {
      expect(tickets.url).toEqual("/tickets");
    });

    it("should method is_there return true", function() {
       var is_there_result = tickets.is_there({user_id:3,data:"27_01_12"});

       expect(is_there_result).toBeTruthy();

    });

    it("should method is_there return false", function() {
       var is_there_result = tickets.is_there({user_id:1,data:"27_01_12"});

       expect(is_there_result).toBeFalsy();

    });


});