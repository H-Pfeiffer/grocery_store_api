const { buyItem } = require('../service/itemService.js');
const itemRepository = require('../repository/itemRepository.js');

jest.mock('../repository/itemRepository.js');

describe("buyItem test version 1", () => {
    let groceryList; 

    beforeAll(() => {
        groceryList = {
            grocery_list: [{
            itemName: "gallon of milk",
            quantity: 1,
            price: 3.15,
            bought: false,
            }]
        };
        itemRepository.readItems.mockResolvedValue(groceryList);
        itemRepository.writeItem.mockResolvedValue(groceryList);
    })


    test("invoking buyItem should call readItems if data exists", () => {
        buyItem("gallon of milk");
        expect(itemRepository.readItems).toHaveBeenCalled();
    });

    test("invoking buyItem should call writeItem if data exists", () => {
        buyItem("gallon of milk");
        expect(itemRepository.writeItem).toHaveBeenCalled();
    });

    test("invoking buyItem should change bought property's value to be true", () => {
        buyItem("gallon of milk");
        expect(groceryList).toStrictEqual({"grocery_list": [{
            itemName: "gallon of milk",
            quantity: 1,
            price: 3.15,
            bought: true,
            }]});
    });

    test("invoking buyItem on groceryList with a Seearchitem that doesn't exist should return false", () => {
        let returnedValue = buyItem("corn");
        expect(returnedValue).resolves.toBeFalsy();
    });

    test("invoking buyItems on groceryList with a searchItem that has already been purchased should return false", () => {
        buyItem("gallon of milk")
        let returnedValue = buyItem("gallon of milk");
        expect(returnedValue).resolves.toBeFalsy();
    });
});