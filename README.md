# NEXTBUY: From Raw Data to Smart Decisions

## Project Overview

NEXTBUY is a data analytics project that transforms raw grocery order data into actionable business insights and predictive models. Using millions of real-world orders from thousands of grocery customers, we analyze shopping behaviors, identify trends, and build ML models to drive revenue, marketing success, and operational efficiency.

Each customer can place one or more orders. Each order contains one or more products. Products are grouped into aisles. Aisles are grouped into departments.

## Objectives

### Business Insights 

1. Which products are the bestsellers?
2. What is the proportion of organic food orders for vegetables?
3. When and how do customers usually order?
4. Can we predict whether a product will be reordered next time by a customer?
5. Which products should be emphasized on Saturdays?
6. How can we optimize in-store product placement to increase profits?
7. What other products do users frequently order with chocolate?
8. What are the main customer profiles (midnight shopper, casual buyer, cart addict)?
9. What products should we recommend to a customer?
10. Which item do customers put in their cart first?
11. Which products have the highest probability of being reordered?
12. Which aisle and department have the most/less products?
13. Are there pairs of products or aisles that are highly correlated?
14. Can we predict the average cart size for customers ordering bakery products?
15. Do average customers order more cat food in the morning than dog food in the evening?
16. Is there a relationship between time of last order and probability of reorder?

### Technical Requirements

- Exploratory Data Analysis (EDA)
- At least 2 predictive ML models
- Feature engineering
- Customer segmentation

## Dataset Overview

Datasets are located in the `../datasets/` directory (parent folder).

| File | Rows | Description |
|------|------|-------------|
| `orders.csv` | 1.44M | User order history |
| `order_products.csv` | 13.7M | Products per order |
| `products.csv` | 49K | Product catalog |
| `aisles.csv` | 134 | Aisle categories |
| `departments.csv` | 21 | Department categories |

### Field Descriptions

| Field | Description |
|-------|-------------|
| `add_to_cart_order` | Product's order position in the cart (1 = first added) |
| `aisle_id` | Aisle's unique identifier |
| `aisle` | Aisle's name |
| `days_since_prior_order` | Number of days since user's previous order |
| `department_id` | Department's unique identifier |
| `department` | Department's name |
| `order_dow` | Order's day of week (0 = Sunday) |
| `order_hour_of_day` | Order's hour of the day (0-23) |
| `order_id` | Order's unique identifier |
| `order_number` | User's order sequence number (1 = first order) |
| `product_id` | Product's unique identifier |
| `product_name` | Product's name |
| `reordered` | Binary flag (1 = already ordered before, 0 = first time ordered) |
| `user_id` | User's unique identifier |

## Project Structure

```
B-DAT-201-PAR-2-1-nextbuy-7/
├── datasets/                     # Raw CSV files
│   ├── orders.csv
│   ├── order_products.csv
│   ├── products.csv
│   ├── aisles.csv
│   └── departments.csv
├── processed/                    # Processed Parquet files
│   ├── full_data.parquet
│   ├── full_data_engineered.parquet
│   └── customer_segments.parquet
├── data_preprocessing_notebook.ipynb
├── eda_notebook.ipynb
├── business_insights_notebook.ipynb
├── business_insights_bonus_notebook.ipynb
├── feature_engineering_notebook.ipynb
├── reorder_model_notebook.ipynb
├── cart_size_model_notebook.ipynb
├── dnn_reorder_model.ipynb
├── Customer_Segmentation.ipynb
└── README.md
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
- **xgboost / lightgbm** - Gradient boosting
- **TensorFlow/Keras** - Deep learning

## Methodology

### 1. Data Preprocessing

- Load 5 CSV files from `../datasets/`
- Merge into unified dataframe
- Handle missing values (e.g., `days_since_prior_order` for first orders)
- Clean and validate data types

### 2. Exploratory Data Analysis

- Dataset overview & statistics
- Bestseller analysis (products, aisles, departments)
- Order timing patterns (heatmap: day vs hour)
- Cart behavior analysis
- Reorder rate analysis

### 3. Feature Engineering

- **User features**: order frequency, avg basket size, preferred times
- **Product features**: popularity, reorder rate

### 4. ML Models

#### Model 1: Reorder Prediction (Logistic Regression / Random Forest)

- **Type**: Binary Classification
- **Target**: `reordered` (0/1)
- **Models**: Logistic Regression, Random Forest
- **Metrics**: Accuracy, Precision, Recall, F1, AUC-ROC

#### Model 2: Cart Size Prediction

- **Type**: Regression
- **Target**: Number of products per order
- **Models**: Linear Regression, Gradient Boosting
- **Metrics**: RMSE, MAE, R²

#### Model 3: Deep Neural Network (Reorder Prediction)

- **Type**: Binary Classification
- **Target**: `reordered` (0/1)
- **Architecture**: Wide & Deep Network with embeddings
- **Features**: User, Product, Order context
- **Metrics**: AUC-ROC, Accuracy, F1

### 5. Customer Segmentation

- K-Means clustering on user behavior
- Profiles: "Midnight Shopper", "Weekend Buyer", "Cart Addict", "Casual Buyer"

## Getting Started

### Prerequisites

```bash
pip install -r requirements.txt
```

### Running the Notebooks

Execute notebooks in the following order:

1. **data_preprocessing_notebook.ipynb** - Clean and merge data
2. **eda_notebook.ipynb** - Exploratory analysis
3. **business_insights_notebook.ipynb** - Business insights (Q1-8)
4. **business_insights_bonus_notebook.ipynb** - Bonus insights (Q9-16)
5. **feature_engineering_notebook.ipynb** - Create ML features
6. **reorder_model_notebook.ipynb** - Reorder prediction (baseline)
7. **cart_size_model_notebook.ipynb** - Cart size prediction (baseline)
8. **dnn_reorder_model.ipynb** - Deep learning reorder prediction
9. **Customer_Segmentation.ipynb** - K-Means clustering

### Bonus Features

Advanced improvements to explore after completing main parts:

- Interactive dashboards (Streamlit, Dash)
- Product relationships visualization (co-purchase networks, Sankey flows)
- Survival analysis for predicting time until next order
- Advanced behavioral features (basket similarity, time-between-orders)
- Gradient boosting with extensive feature engineering
- Product-product graphs and network features
- Anomaly detection for unusual customer patterns
- Multi-level aggregations (user, product, order signals)
- t-SNE projections for product/user embeddings
- Deep sequential models (RNN, GRU, LSTM)
- Model stacking or ensemble methods
- Hyperparameter optimization (Optuna, AutoGluon)
- SHAP or permutation importance for interpretability
- Bayesian hierarchical modeling
