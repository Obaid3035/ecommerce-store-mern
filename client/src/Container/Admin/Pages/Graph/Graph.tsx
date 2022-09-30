import React, {useEffect, useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";
import {getMonthlySales, getYearlySales} from "../../../../api/admin/order";
import {Spinner, Tab, Tabs} from "react-bootstrap";
import {ORDER_KEY} from "../../../../Interfaces";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


enum GRAPH_KEY {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}

const Graph = () => {

    const [monthlyData, setMonthlyData] = useState<any>(null)
    const [yearlyData, setYearlyData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: "Monthly Order Sales"
            }
        }
    };

    function daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    const monthlyLabels = new Array(
        daysInMonth(new Date().getMonth() + 1, new Date().getFullYear())
    )
        .fill(0)
        .map((i, index) => {
            return index + 1;
        });


    const yearlyLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    useEffect(() => {
        setIsLoading(true)
        getMonthlySales()
            .then((res) => {
                setIsLoading(false)
                let dataSet = res.data
                setMonthlyData({
                    labels: monthlyLabels,
                    datasets: [
                        {
                            label: "Sales",
                            data: new Array(
                                daysInMonth(new Date().getMonth() + 1, new Date().getFullYear())
                            )
                                .fill(0)
                                .map((i, index) => {
                                    for (let v = 0; v < dataSet.length; v++) {
                                        if (parseInt(dataSet[v]._id) === index + 1) {
                                            return dataSet[v].amount;
                                        }
                                    }
                                }),
                            backgroundColor: "rgba(255, 99, 132, 0.5)"
                        }
                    ]
                })

            })

        getYearlySales()
            .then((res) => {
                setIsLoading(false)
                let data = res.data;
                setYearlyData({
                    labels: yearlyLabels,
                    datasets:  [
                        {
                            label: "Sales",
                            data: yearlyLabels.map((i, index) => {
                                for (const i of data) {
                                    if (parseInt(i._id) === index + 1) {
                                        return i.amount;
                                    }
                                }
                            }),
                            backgroundColor: "rgba(255, 99, 132, 0.5)"
                        }
                    ]
                })
            })


    }, [])

    const [key, setKey] = useState<string>(GRAPH_KEY.MONTHLY)

    return (
        <div className='page_responsive'>
            {
                !isLoading && monthlyData && yearlyData ? (
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => {
                            setKey(k!)
                        }}
                    >
                        <Tab eventKey={GRAPH_KEY.MONTHLY} title="Monthly Sales" className={'w-100'}>
                            <Bar options={options} data={monthlyData}/>
                        </Tab>

                        <Tab eventKey={GRAPH_KEY.YEARLY} title="Yearly Sales" className={'w-100'}>
                            <Bar options={options} data={yearlyData}/>
                        </Tab>
                    </Tabs>
                ) : (
                    <div className={"text-center"}>
                        <Spinner animation={"border"}/>
                    </div>
                )
            }
        </div>
    )
}

export default Graph
