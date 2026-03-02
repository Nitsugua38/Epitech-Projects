# NEXTBUY: From Raw Data to Smart Decisions

> *"The world cannot be understood without numbers. But the world cannot be understood with numbers alone."* — Hans Rosling, Factfulness — 

## Project Overview

NEXTBUY is a data analytics project that transforms raw grocery order data into actionable business insights and predictive models. Using millions of real-world orders from thousands of grocery customers, we analyze shopping behaviors, identify trends, and build ML models to drive revenue, marketing success, and operational efficiency.

## Objectives

### Business Insights (8+ Questions)
1. Which products are the bestsellers overall?
2. What is the reorder rate by product/category?
3. When do customers typically order (day of week, hour)?
4. Which products are most frequently added first to cart?
5. What are the most correlated product pairs (co-purchase)?
6. What is the average cart size by department?
7. What are the main customer shopping patterns?
8. Can we predict reorder probability for a customer-product pair?

### Technical Requirements
- Exploratory Data Analysis (EDA)
- At least 2 predictive ML models
- Feature engineering
- Customer segmentation

## Dataset Overview

| File | Rows | Description |
|------|------|-------------|
| `orders.csv` | 1.44M | User order history |
| `order_products.csv` | 13.7M | Products per order |
| `products.csv` | 49K | Product catalog |
| `aisles.csv` | 134 | Aisle categories |
| `departments.csv` | 21 | Department categories |

### Key Fields

| Field | Description |
|-------|-------------|
| `order_id` | Order's unique identifier |
| `user_id` | User's unique identifier |
| `product_id` | Product's unique identifier |
| `add_to_cart_order` | Product's position in cart (1 = first) |
| `reordered` | Binary: 1 = reordered, 0 = first time |
| `order_dow` | Day of week (0 = Sunday) |
| `order_hour_of_day` | Hour of order (0-23) |
| `days_since_prior_order` | Days since previous order |
| `order_number` | User's order sequence number |

## Project Structure

```
NEXTBUY/
├── datasets/              # Raw data files
│   ├── orders.csv
│   ├── order_products.csv
│   ├── products.csv
│   ├── aisles.csv
│   └── departments.csv
├── notebook.ipynb         # Main analysis & models
└── README.md             # This file
```

## Git Branch Strategy

| Branch | Description |
|--------|-------------|
| `main` | Production-ready deliverable |
| `develop` | Integration branch |
| `data-preprocessing` | Load & merge datasets |
| `eda-overview` | Dataset exploration |
| `business-insights` | Visualizations & insights |
| `feature-engineering` | Create ML features |
| `reorder-model` | Classification model |
| `cart-size-model` | Regression model |
| `customer-segmentation` | K-Means clustering |

## Tools & Libraries

- **Jupyter Notebook** - Interactive analysis
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **matplotlib / seaborn** - Data visualization
- **scikit-learn** - Machine learning
- **xgboost / lightgbm** - Gradient boosting (optional)

## Methodology

### 1. Data Preprocessing
- Load 5 CSV files
- Merge into unified dataframe
- Handle missing values (e.g., first-order users)

### 2. Exploratory Data Analysis
- Dataset overview & statistics
- Bestseller analysis (products, aisles, departments)
- Order timing patterns (heatmap: day vs hour)
- Cart behavior analysis

### 3. Feature Engineering
- **User features**: order frequency, avg basket size, preferred times
- **Product features**: popularity, reorder rate
- **Order features**: days since last order, sequence number

### 4. ML Models

#### Model 1: Reorder Prediction
- **Type**: Binary Classification
- **Target**: `reordered` (0/1)
- **Models**: Logistic Regression, Random Forest
- **Metrics**: Accuracy, Precision, Recall, F1, AUC-ROC

#### Model 2: Cart Size Prediction
- **Type**: Regression
- **Target**: Number of products per order
- **Models**: Linear Regression, Gradient Boosting
- **Metrics**: RMSE, MAE, R²

### 5. Customer Segmentation
- K-Means clustering on user behavior
- Profiles: "Midnight Shopper", "Weekend Buyer", "Cart Addict", etc.

## Getting Started

### Prerequisites
```bash
pip3 install pandas numpy matplotlib seaborn scikit-learn
```

### Running the Notebook
```bash
jupyter notebook notebook.ipynb
```
