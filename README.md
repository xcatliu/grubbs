# Grubbs' test for outliers

Online Grubbs' test for outliers: http://xcatliu.github.io/grubbs/

## What is Grubbs' test

> Grubbs' test (named after Frank E. Grubbs, who published the test in 1950), also known as the maximum normed residual test or extreme studentized deviate test, is a statistical test used to detect outliers in a univariate data set assumed to come from a normally distributed population.

For more information, please visit [Grubbs' test for outliers].

## Usage

### Use online calculator

1. Open online Grubbs' test for outliers: http://xcatliu.github.io/grubbs/
2. Choose significance level
3. Enter or paste your data, one value per row, up to 100 rows
4. Click `Go` button to see the result

### Use as node modules

#### First install `grubbs` via npm

```shell
npm install grubbs --save
```

#### Then use `grubbs.test` function

```js
var grubbs = require('grubbs');
var dataSet = [
  10.45, 10.26, 10.49, 10.36, 10.53, 10.77, 10.40, 10.40, 10.56, 10.88, 10.47,
  10.49, 10.46, 10.38, 10.47, 10.39, 10.51, 10.49, 10.54, 10.46, 10.45, 10.49,
  10.46, 10.46, 10.51, 10.47, 10.54, 10.52, 10.47, 10.44, 11.62, 11.60, 10.42,
  10.42, 10.39, 10.22, 10.47, 10.42, 10.52, 10.57, 10.49, 10.49, 10.51, 10.47,
  10.51, 10.48, 10.4, 10.3, 10.47, 10.45
];
var result = grubbs.test(dataSet);
console.log(result);
```

## API

### `grubbs.test`

TODO

## Contribution

### Getting Start

```shell
npm install
npm start
```

### Deploy gh-pages

```shell
npm run deploy:gh-pages
```

## Competing Products

- [GraphPad Software Grubbs1](http://graphpad.com/quickcalcs/Grubbs1.cfm)

## Reference

- [Grubbs' test for outliers]
- [Grubbs' critical value table](http://www.sediment.uni-goettingen.de/staff/dunkl/software/pep-grubbs.pdf)
- [格鲁布斯检验 - 化学化工专业知识百科网](http://111.207.167.154/hdwiki/index.php?doc-view-134909)
- [异常值（outlier）的判别与剔除](https://blog.csdn.net/wenyiming1991/article/details/48402731)

[Grubbs' test for outliers]: https://en.wikipedia.org/wiki/Grubbs%27_test_for_outliers
