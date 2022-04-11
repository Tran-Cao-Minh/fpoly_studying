import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  CustomSelectCreator
} from '../../class/custom-select-creator';
import {
  DataReader
} from '../../class/data-interactor';

interface StatisticsOrderItem {
  orderYear: number,
  orderMonth: number,
  orderTotalQuantity: number,
  orderTotalMoney: number
};
interface MonthItem {
  name: string,
  value: number
};

const createCustomYearSelect = (
  orderDateList: Array<string>
): void => {
  const statisticsYearSelect: HTMLElement = document.querySelector('#js-statistics-year');
  const statisticsYearSelectContainer: HTMLElement =
    statisticsYearSelect.querySelector('.custom-select-list');
  const statisticsYearSelectText: HTMLElement =
    statisticsYearSelect.querySelector('.custom-select-text');
  const statisticsYearSelectLabel: HTMLElement =
    document.querySelector('[for=js-statistics-year]');
  const statisticsYearSelectCreator: CustomSelectCreator = new CustomSelectCreator(
    statisticsYearSelect,
    'active',
    statisticsYearSelectContainer,
    [
      'value',
    ],
  );
  statisticsYearSelectCreator.createLabelPointer(statisticsYearSelectLabel);

  const orderYearList: Array<number> = [];
  orderDateList.forEach((date: string) => {
    const orderDate: Date = new Date(date);
    const orderYear: number = orderDate.getFullYear();

    if (!orderYearList.includes(orderYear)) {
      orderYearList.push(orderYear);
    };
  });
  orderYearList.sort().reverse();

  orderYearList.forEach((year: number) => {
    statisticsYearSelectCreator.addOptionItem(
      String(year),
      [{
        key: 'value',
        data: String(year),
      }]
    );
  });

  statisticsYearSelectCreator.createCustomSelect(
    String(orderYearList[0]),
    statisticsYearSelectText,
    'choosen',
  );
};

const getStatisticsOrderData = (
  ordersList: Array<StatisticsOrderItem>,
  statisticsYearValue: number
) => {
  const monthList: Array<MonthItem> = [{
    name: 'Jan',
    value: 1
  },
  {
    name: 'Feb',
    value: 2
  },
  {
    name: 'Mar',
    value: 3
  },
  {
    name: 'Apr',
    value: 4
  },
  {
    name: 'May',
    value: 5
  },
  {
    name: 'Jun',
    value: 6
  },
  {
    name: 'Jul',
    value: 7
  },
  {
    name: 'Aug',
    value: 8
  },
  {
    name: 'Sep',
    value: 9
  },
  {
    name: 'Oct',
    value: 10
  },
  {
    name: 'Nov',
    value: 11
  },
  {
    name: 'Dec',
    value: 12
  },
  ];

  const soldQuantityData: Array<number> = [];
  const totalMoneyData: Array<number> = [];

  monthList.forEach((month: MonthItem) => {
    let soldQuantity = 0;
    let totalMoney = 0;

    ordersList.forEach((order: StatisticsOrderItem) => {
      if (
        order.orderYear === statisticsYearValue &&
        order.orderMonth === month.value
      ) {
        soldQuantity += order.orderTotalQuantity;
        totalMoney += order.orderTotalMoney;
      };
    });

    soldQuantityData.push(soldQuantity);
    totalMoneyData.push(totalMoney);
  });

  const data: ChartData = {
    labels: monthList.map((month: MonthItem) => month.name),
    datasets: [{
      label: 'Sold',
      data: soldQuantityData,
      borderColor: '#435ebecc',
      borderWidth: 4,
      backgroundColor: '#435ebedd',
      yAxisID: 'Sold',
      type: 'line',
    },
    {
      label: 'Revenue',
      data: totalMoneyData,
      borderColor: '#198754cc',
      borderWidth: 4,
      backgroundColor: '#198754dd',
      yAxisID: 'Revenue',
      type: 'bar'
    }]
  };

  return data;
};

const createStatisticsOrderChart = (
  statisticsContainer: HTMLCanvasElement,
  ordersList: Array<StatisticsOrderItem>,
  statisticsYearValue: number
): any => {
  const ctx: CanvasRenderingContext2D = statisticsContainer.getContext('2d');
  const data = getStatisticsOrderData(ordersList, statisticsYearValue);

  const chartConfig: ChartConfiguration = {
    type: 'scatter',
    data: data,
    options: {
      plugins: {
        title: {
          display: false,
        },
        legend: {
          position: 'bottom',
        }
      },
      scales: {
        Sold: {
          type: 'linear',
          position: 'left',
          ticks: {
            stepSize: 10
          },
        },
        Revenue: {
          type: 'linear',
          position: 'right',
          ticks: {
            stepSize: 100
          },
        }
      }
    },
  };

  return new Chart(ctx, chartConfig);
};

window.addEventListener('load', () => {
  const fetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/orders';
  const ordersInformationReader: DataReader = new DataReader(fetchLink);
  ordersInformationReader.readData((fullData: { [key: string]: any }) => {
    const ordersList: Array<StatisticsOrderItem> = [];

    const orderDataColumnKey: string = 'OrderDate';
    Object.keys(fullData).map((firebaseKey: string) => {
      const orderDate: Date = new Date(fullData[firebaseKey][orderDataColumnKey]);
      const orderYear: number = orderDate.getFullYear();
      const orderMonth: number = (orderDate.getMonth() + 1);
      const orderTotalQuantity: number = (() => {
        let total: number = 0;

        const orderDetailsColumnKey: string = 'OrderDetails';
        const orderItemList: Array<{ [key: string]: any }> = Object.keys(fullData[firebaseKey][orderDetailsColumnKey]).map((orderItemFirebaseKey: string) => {
          return fullData[firebaseKey][orderDetailsColumnKey][orderItemFirebaseKey];
        });
        const orderProductQuantityColumnKey: string = 'ProductQuantity';
        orderItemList.forEach((product: { [key: string]: any }) => {
          total += product[orderProductQuantityColumnKey];
        });

        return total;
      })();

      const orderTotalMoneyColumnKey: string = 'OrderTotalMoney';
      ordersList.push({
        orderYear,
        orderMonth,
        orderTotalQuantity,
        orderTotalMoney: fullData[firebaseKey][orderTotalMoneyColumnKey]
      });
    });

    createCustomYearSelect(Object.keys(fullData).map((firebaseKey: string) => {
      return fullData[firebaseKey][orderDataColumnKey];
    }));

    const statisticsContainer: HTMLCanvasElement = document.querySelector('#statisticsOrders');
    const statisticsYearSelect: HTMLElement = document.querySelector('#js-statistics-year');
    const chart = createStatisticsOrderChart(statisticsContainer, ordersList, Number(statisticsYearSelect.getAttribute('value')));

    let oldStatisticsYear: number = Number(statisticsYearSelect.getAttribute('value'));
    statisticsYearSelect.addEventListener('DOMSubtreeModified', () => {
      const statisticsYearValue: number = Number(statisticsYearSelect.getAttribute('value'));
      if (statisticsYearValue !== oldStatisticsYear) {
        oldStatisticsYear = statisticsYearValue;
        chart.data = getStatisticsOrderData(ordersList, statisticsYearValue);
        chart.update();
      };
    });
  });
});