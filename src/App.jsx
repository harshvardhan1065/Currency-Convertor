import { useState } from 'react'
import InputBox from './Components/Input'
import UseCurrencyInfo from './Hooks/UseCurrencyInfo'


function App() {

  const [amount, setamount] = useState(0)
  const [convertAmount, setconvertAmount] = useState(0)
  const [from, setfrom] = useState("usd")
  const [to, setto] = useState("inr")

  const currencyInfo = UseCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const convertCurrency = () =>{
    setconvertAmount(amount*currencyInfo[to])
  }

  const swap = () =>{
    setfrom(to)
    setto(from)
    setconvertAmount(amount)
    setamount(convertAmount)
  }


  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url('https://images.pexels.com/photos/318820/pexels-photo-318820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convertCurrency()
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              amount={amount}
                              currencyOptions = {options}
                              onCurrencyChange = {(currency) => setfrom(currency)}
                              onAmountChange = {(amount) => {setamount(amount)}}
                              selectCurrency = {from}
                              
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                              onClick= {swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              amount={convertAmount}
                              currencyOptions = {options}
                              onCurrencyChange = {(currency) => setto(currency)}
                              selectCurrency = {to}
                              amountDisable
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                          Convert {from.toUpperCase()} to {to.toUpperCase()}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App
