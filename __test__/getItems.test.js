const { getItems } = require('../service/itemService.js');
const itemRepository = require('../repository/itemRepository.js');

jest.mock('../repository/itemRepository.js');

describe("getItem test version 1", () => {
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
    })

    test("invoking getItems should call readItems", () => {
        getItems();
        expect(itemRepository.readItems).toHaveBeenCalled();
    });

    test("returns a value when an item is stored", () => {
        const data = getItems();
        expect(data).resolves.toBe(groceryList);
    })
});