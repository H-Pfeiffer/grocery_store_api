const { deleteItem } = require('../service/itemService.js');
const itemRepository = require('../repository/itemRepository.js');

jest.mock('../repository/itemRepository.js');

describe("deleteItem test version 1", () => {
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


    test("invoking deleteItems should call readItems if data exists", () => {
        deleteItem("gallon of milk");
        expect(itemRepository.readItems).toHaveBeenCalled();
    });

    test("invoking deleteItems should call writeItem if data exists", () => {
        deleteItem("gallon of milk");
        expect(itemRepository.writeItem).toHaveBeenCalled();
    });

    test("invoking deleteItems should result in item being deleted", () => {
        deleteItem("gallon of milk");
        expect(groceryList).toStrictEqual({"grocery_list": []});
    });

    test("invoking deleteItems groceryList is empty should return false", () => {
        deleteItem("gallon of milk");
        let returnedValue = deleteItem("corn");
        expect(returnedValue).resolves.toBeFalsy();
    });

    test("invoking deleteItems groceryList with a searchItem that doesn't exist should return false", () => {
        let returnedValue = deleteItem("corn");
        expect(returnedValue).resolves.toBeFalsy();
    });

    // test("invoking deleteItems groceryList with a searchItem that does exist should return true", () => {
    //     let returnedValue = deleteItem("gallon of milk");
    //     expect(returnedValue).toBe(true);
    // });
});