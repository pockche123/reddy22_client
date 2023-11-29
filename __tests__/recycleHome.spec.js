/***
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../recycleHome.html'), 'utf8')
const recycle = require('../static/js/recycleHome')

const sampleBins = [{
    "bin_id": 1,
    "bin_type": "Recycling collection",
    "color": "blue",
    "bin_image": "https://www.warwickdc.gov.uk/images/Recycing_bin_1.jpg",
    "info": "Your 240 litre recycling bin will be collected every fortnight - check the collection calendar for your collection day."
},
{
    "bin_id": 2,
    "bin_type": "Refuge collection",
    "color": "grey",
    "bin_image": "https://www.warwickdc.gov.uk/images/Waste_bin_1.jpg",
    "info": "The grey bin is collected every three weeks.\\nPlease use your grey bin for household items that can not be recycled. All rubbish must be contained in the grey bin with the lid firmly closed. Bags of rubbish left anywhere around the bin will not be collected. Any extra rubbish can be taken to a Household Waste Recycling Centre."
}]


global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(sampleBins)
    })
);

describe('recycleHome.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
        global.fetch.mockClear();

    })

    afterEach(() => {
        jest.clearAllMocks()
    })


    test('fetches bins and displays them', async () => {
        // Call the fetchBins function
        await recycle.fetchBins();
        expect(fetch).toHaveBeenCalledWith('https://reddy-2-2-be.onrender.com/bins');
    });

    



})
