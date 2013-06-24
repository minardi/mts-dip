describe("Ticket model", function() {
   
    beforeEach(function(){
    	
      ticket_model = new TicketModel();

    });


	it("should have urlRoot eq tickets", function() {
      expect(ticket_model.urlRoot).toEqual("tickets");
    });

    it("should have field type", function() {
      expect(ticket_model.type).toBeDefined();
    });

    it("should have field selector", function() {
      expect(ticket_model.selector).toBeDefined();
    });

    it("should have field doctor_name", function() {
      expect(ticket_model.doctor_name).toBeDefined();
    });


});