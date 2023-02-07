import React, { useLayoutEffect, useState } from 'react'
import { XAxis, YAxis, AreaChart, Area } from 'recharts';


    const ChartComponentM = ({data, pricesData}) => {
        console.log("Price data", pricesData)
        return (
            <div className='xl:mx-[20%]  mx-[0%]'>
                <AreaChart width={200} height={50} data={data}>
                    <defs className=''>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop  offset="1%" stopColor={pricesData ? "#17ff00": "#ff0000"} stopOpacity={0.8}/>
                        <stop  offset="100%" stopColor={pricesData ? "#17ff00": "#ff0000"} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area className="cursor-pointer " fill="url(#colorUv)" dot={false} type="category" dataKey="prices" stroke="#000" strokeWidth={"1px"} />
                    <XAxis dataKey="date" hide />
                    <YAxis dataKey="prices" hide domain={["auto", "auto"]}/>
                </AreaChart>
            </div>
        )
    }


const MinimalChart = ({id}) => {

    const [chartDataM, setChartDataM] = useState()
    
    const [pricesIsUp , setPricesIsUp] = useState()
    const [isUp, setIsUp] = useState()

    useLayoutEffect(() => {
        
        const getChartData = async (id) => {

            try {
                const data = await fetch (`
                https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily
                `)
                .then((res) => res.json())
                .then((json) => json)
    
                console.log("ChartDataMininmal", data)

                let convertedData = data.prices.map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        prices: item[1]
                    }
                })

                const today = convertedData[0].prices
                const yesterday = convertedData[1].prices

                console.log("today", today)
                console.log("yesterday", yesterday)

                //let pricesData = () => { today > yesterday ? setPricesIsUp(true) : setPricesIsUp(false) ; return pricesIsUp }

                let pricesData = () => {
                    if (today > yesterday) {
                      setPricesIsUp(true)
                      return true
                    } else {
                      setPricesIsUp(false)
                      return false
                    }
                  }

                console.log("Prices is up", pricesIsUp)

                setIsUp(pricesData())
                setChartDataM(convertedData)
                
                console.log("IsUp", isUp)
                console.log("Prices Data", pricesData())

            }catch (error){

                console.log(error)
                
            }

        }

        getChartData(id)

    }, [id, pricesIsUp, isUp])
  return (
    <div className=''>
        <ChartComponentM data={chartDataM} pricesData={isUp}/>
    </div>
  )
}

export default MinimalChart