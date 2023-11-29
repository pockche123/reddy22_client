/***
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../bin.html'), 'utf8')
const bin = require('../static/js/bin')

const sampleBin = [
  {
    bin_id: 1,
    bin_type: 'Recycling collection',
    color: 'blue',
    bin_image: 'https://www.warwickdc.gov.uk/images/Recycing_bin_1.jpg',
    info: 'Your 240 litre recycling bin will be collected every fortnight - check the collection calendar for your collection day.'
  }
]

const materialInBin = [
  {
    material_id: 1,
    name: 'paper',
    material_image:
      'https://www.pixartprinting.co.uk/blog/wp-content/uploads/2021/03/Carta_Riciclata.jpg',
    bin_id: 1
  }
]

const notInBin = [
  {
    material_id: 2,
    name: 'card and cardboard',
    material_image:
      'https://miro.medium.com/v2/resize:fit:1200/1*KR7l3KcOvAp50OAilLMNUQ.jpeg',
    bin_id: 2
  }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(sampleBin)
  })
)

describe('bins.html', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
    global.fetch.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetches bins and displays them', async () => {
    // Call the fetchBin function
    await bin.fetchBin()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('fetches materials in bin and displays them', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(materialInBin)
      })
    )
      await bin.fetchToPutInBin()
      expect(fetch).toHaveBeenCalledTimes(1)
  })
    
    test('fetches materials not in bin and displays them', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(notInBin)
      })
    )
      await bin.fetchNotToPutInBin()
      expect(fetch).toHaveBeenCalledTimes(1)
  })
})
