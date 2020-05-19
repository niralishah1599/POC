import { OrderSearchPipe } from "./order-search.pipe";


describe('order search pipe',()=>{
    let items;

    beforeEach(()=>{
    items=[
    {id:1,customerName:"nirali",shipper:"john",address:"navkarBunglows",city:"jam", orderDate:"20-20-2020",orderTotal:10},
    {id:2,customerName:"nirali",shipper:"john",address:"navkarBunglows",city:"jam", orderDate:"20-20-2020",orderTotal:10}
    ]   
    })
    it('filter pipe should check the transform ',()=>{
        let pipe = new OrderSearchPipe();
        pipe.transform(items,"nirali")
        expect(pipe.transform(items,"nirali")).toContain(items[0],items[0].customerName)
    })

    it("filter pipe should return all items if no field is given", () => {
        let pipe = new OrderSearchPipe();   
        let items = [];
        let filtered = pipe.transform(items, null);
        expect(filtered).toEqual(items);
    });

    it("filter pipe should filter",()=>{
        let pipe = new OrderSearchPipe();
        let filtered = pipe.transform(items,"nirali");
        expect(filtered.length).toBe(2);
    })
});