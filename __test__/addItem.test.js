const { addItem } = require('../service/itemService.js');
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


    test("invoking addItem should call readItems if data exists", () => {
        addItem("gallon of milk");
        expect(itemRepository.readItems).toHaveBeenCalled();
    });

    test("invoking addItem should call writeItem if data exists", () => {
        addItem("gallon of milk");
        expect(itemRepository.writeItem).toHaveBeenCalled();
    });

    test("invoking addItem should increase grocery list length by one", () => {
        let newItem = {
            itemName: "loaf of bread",
            quantity: 1,
            price: 2.45,
            bought: false,
        }
        addItem(newItem);
        expect(groceryList.grocery_list.length()).toBe(2);
    });

    test("invoking addItem with correct input should invoke writeItem with a object with the following properties: itemName: string (trimmed to lowercase), quantity: integer, price: float, bought: boolean", () => {
        let newItem = {
            itemName: " Frozen Pizza ",
            quantity: 1,
            price: 4.65,
            bought: false,
        }
        let cleanedData = {
            itemName: " Frozen Pizza ",
            quantity: 1,
            price: 4.65,
            bought: false,
        }
        addItem(newItem);
        expect(itemRepository.writeItem).toHaveBeenCalledWith(cleanedData);
    })
});