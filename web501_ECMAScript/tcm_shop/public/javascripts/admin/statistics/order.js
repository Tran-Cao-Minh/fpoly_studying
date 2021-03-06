import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js';
import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader
} from '../../class/data-interactor.js';

const createCustomYearSelect = (
  orderDateList = [String()]
) => {
  const statisticsYearSelect = document.querySelector('#js-statistics-year');
  const statisticsYearSelectContainer =
    statisticsYearSelect.querySelector('.custom-select-list');
  const statisticsYearSelectText =
    statisticsYearSelect.querySelector('.custom-select-text');
  const statisticsYearSelectLabel =
    document.querySelector('[for=js-statistics-year]');
  const statisticsYearSelectCreator = new CustomSelectCreator(
    statisticsYearSelect,
    'active',
    statisticsYearSelectContainer,
    [
      'value',
    ],
  );
  statisticsYearSelectCreator.createLabelPointer(statisticsYearSelectLabel);

  const orderYearList = [];
  orderDateList.forEach((date = String()) => {
    const orderDate = new Date(date);
    const orderYear = orderDate.getFullYear();

    if (!orderYearList.includes(orderYear)) {
      orderYearList.push(orderYear);
    };
  });
  orderYearList.sort().reverse();

  orderYearList.forEach((year = Number()) => {
    statisticsYearSelectCreator.addOptionItem(
      year,
      [{
        key: 'value',
        data: year,
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
  ordersList = [Object()],
  statisticsYearValue = Number()
) => {
  const monthList = [{
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

  const soldQuantityData = [];
  const totalMoneyData = [];

  monthList.forEach((month = Object()) => {
    let soldQuantity = 0;
    let totalMoney = 0;

    ordersList.forEach((order = Object()) => {
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

  const data = {
    labels: monthList.map((month = Object()) => month.name),
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
      }
    ]
  };

  return data;
};

const createStatisticsOrderChart = (
  statisticsContainer = Node(),
  ordersList = [Object()],
  statisticsYearValue = Number()
) => {
  const ctx = statisticsContainer.getContext('2d');
  const data = getStatisticsOrderData(ordersList, statisticsYearValue);

  const chartConfig = {
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
          gridLines: {
            color: 'blue',
          },
        },
        Revenue: {
          type: 'linear',
          position: 'right',
          ticks: {
            stepSize: 100
          },
          gridLines: {
            color: '#45f',
          },
        }
      }
    },
  };

  return new Chart(ctx, chartConfig);
};

window.addEventListener('load', () => {
  const fetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/orders';
  const ordersInformationReader = new DataReader(fetchLink);
  ordersInformationReader.readData((fullData) => {
    const ordersList = [];

    const orderDataColumnKey = 'OrderDate';
    Object.keys(fullData).map((firebaseKey = String) => {
      const orderDate = new Date(fullData[firebaseKey][orderDataColumnKey]);
      const orderYear = orderDate.getFullYear();
      const orderMonth = (orderDate.getMonth() + 1);
      const orderTotalQuantity = (() => {
        let total = 0;

        const orderDetailsColumnKey = 'OrderDetails';
        const orderItemList = Object.keys(fullData[firebaseKey][orderDetailsColumnKey]).map((orderItemFirebaseKey = String()) => {
          return fullData[firebaseKey][orderDetailsColumnKey][orderItemFirebaseKey];
        });
        const orderProductQuantityColumnKey = 'ProductQuantity';
        orderItemList.forEach((product = Object()) => {
          total += product[orderProductQuantityColumnKey];
        });

        return total;
      })();

      const orderTotalMoneyColumnKey = 'OrderTotalMoney';
      ordersList.push({
        orderYear,
        orderMonth,
        orderTotalQuantity,
        orderTotalMoney: fullData[firebaseKey][orderTotalMoneyColumnKey]
      });
    });

    createCustomYearSelect(Object.keys(fullData).map((firebaseKey = String()) => {
      return fullData[firebaseKey][orderDataColumnKey];
    }));

    const statisticsContainer = document.querySelector('#statisticsOrders');
    const statisticsYearSelect = document.querySelector('#js-statistics-year');
    const chart = createStatisticsOrderChart(statisticsContainer, ordersList, Number(statisticsYearSelect.getAttribute('value')));

    let oldStatisticsYear = Number(statisticsYearSelect.getAttribute('value'));
    statisticsYearSelect.addEventListener('DOMSubtreeModified', () => {
      const statisticsYearValue = Number(statisticsYearSelect.getAttribute('value'));
      if (statisticsYearValue !== oldStatisticsYear) {
        oldStatisticsYear = statisticsYearValue;
        chart.data = getStatisticsOrderData(ordersList, statisticsYearValue);
        chart.update();
      };
    });
  });
});