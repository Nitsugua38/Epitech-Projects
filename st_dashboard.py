import joblib
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt



bool_eda = False
bool_pred = False



st.set_page_config(page_title="NextBuy Dashboard", layout="wide")

st.title("NextBuy | Users shopping trends analysis")
st.divider()
st.header("Dynamic EDA")




pFile = st.file_uploader("Please upload the dataset file [full_data.parquet] here", type="parquet", max_upload_size=500)

if pFile is None:
    st.info("Waiting for dataset...")

else:
    st.divider()
    full_data = pd.read_parquet(pFile)
    bool_eda = True







if bool_eda and not bool_pred:
    st.sidebar.header("Filters")
    st.sidebar.text("Day of Week")
    checkMonday = st.sidebar.checkbox("Monday", True)
    checkTuesday = st.sidebar.checkbox("Tuesday", True)
    checkWednesday = st.sidebar.checkbox("Wednesday", True)
    checkThursday = st.sidebar.checkbox("Thursday", True)
    checkFriday = st.sidebar.checkbox("Friday", True)
    checkSaturday = st.sidebar.checkbox("Saturday", True)
    checkSunday = st.sidebar.checkbox("Sunday", True)


    st.sidebar.divider()
    st.sidebar.text("Department")

    departmentList = full_data["department"].dropna().unique()

    departmentListEnabled = []
    for depart in departmentList:
        btn = st.sidebar.checkbox(depart, True)
        if btn:
            departmentListEnabled.append(depart)

    dowEnabled = []
    if checkMonday: dowEnabled.append(1)
    if checkTuesday: dowEnabled.append(2)
    if checkWednesday: dowEnabled.append(3)
    if checkThursday: dowEnabled.append(4)
    if checkFriday: dowEnabled.append(5)
    if checkSaturday: dowEnabled.append(6)
    if checkSunday: dowEnabled.append(0)



    full_data = full_data[full_data["department"].isin(departmentListEnabled)]
    full_data = full_data[full_data["order_dow"].isin(dowEnabled)]











    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        st.metric("Unique users", f"{full_data['user_id'].nunique():,}")
    with col2:
        st.metric("Unique orders", f"{full_data['order_id'].nunique():,}")
    with col3:
        st.metric("Unique products", f"{full_data['product_id'].nunique():,}")
    with col4:
        st.metric("Unique aisles", f"{full_data['aisle_id'].nunique()}")
    with col5:
        st.metric("Unique departments", f"{full_data['department_id'].nunique()}")

    st.divider()




    st.header("Order timing analysis")
    c1, c2 = st.columns(2)

    with c1:
        st.subheader("Orders by hour of day")

        hour_counts = full_data['order_hour_of_day'].value_counts().sort_index()
        plot1 = plt.figure()
        plt.bar(hour_counts.index.astype(int), hour_counts.values, color='coral')
        plt.xlabel('Hour of Day')
        plt.ylabel('Number of Orders')
        plt.xticks(range(0, 24, 2))
        st.pyplot(plot1)
    
    with c2:
        st.subheader("Order Frequency by Hour")

        order_heatmap = full_data.groupby(['order_hour_of_day']).size()
        plot2 = plt.figure()
        plt.fill_between(order_heatmap.index.astype(int), order_heatmap.values, alpha=0.3, color='steelblue')
        plt.plot(order_heatmap.index.astype(int), order_heatmap.values, color='steelblue', linewidth=2)
        plt.xlabel('Hour of Day')
        plt.ylabel('Number of Orders')
        plt.xticks(range(0, 24, 2))
        plt.grid(True, alpha=0.3)
        st.pyplot(plot2)




    st.divider()


    st.header("Product Analysis - Bestsellers")
    c3, c4 = st.columns(2)

    with c3:
        st.subheader("Top 10 Best-Selling Products")

        top_products = full_data['product_name'].value_counts().head(10)
        plot3 = plt.figure()
        plt.barh(range(10), top_products.values[::-1], color='teal')
        plt.yticks(range(10), top_products.index[::-1])
        plt.xlabel('Number of Orders')
        st.pyplot(plot3)




    st.divider()


    st.header("Category Analysis")

    try:

        c5, c6 = st.columns(2)

        with c5:
            st.subheader("Top 10 Aisles by Orders")

            top_aisles = full_data['aisle'].value_counts().head(10)
            plot5 = plt.figure(figsize=(10,8))
            plt.barh(range(10), top_aisles.values[::-1], color='purple')
            plt.yticks(range(10), top_aisles.index[::-1])
            plt.xlabel('Number of Orders')
            st.pyplot(plot5)

        with c6:
            st.subheader("Departments by Orders")

            top_depts = full_data['department'].value_counts()
            plot6 = plt.figure(figsize=(10,7))
            plt.barh(range(len(top_depts)), top_depts.values[::-1], color='orange')
            plt.yticks(range(len(top_depts)), top_depts.index[::-1])
            plt.xlabel('Number of Orders')
            st.pyplot(plot6)
    
    except:

        st.info("Not enough aisles in the selected data.")




    st.divider()


    st.header("Reorder / Cart Size Analysis")
    c7, c8 = st.columns(2)

    with c7:
        st.subheader("Reorder vs First Time Orders")

        reorder_rate = full_data['reordered'].mean() * 100
        plot7 = plt.figure()
        plt.pie([reorder_rate, 100-reorder_rate], 
            labels=['Reordered', 'First Time'], 
            autopct='%1.1f%%',
            colors=['#2ecc71', '#e74c3c'],
            explode=(0.05, 0))
        st.pyplot(plot7)

    with c8:
        st.subheader("Distribution of Cart Size")

        cart_size = full_data.groupby('order_id').size()
        plot8 = plt.figure()
        plt.hist(cart_size, bins=50, color='steelblue', edgecolor='black', alpha=0.7)
        plt.xlabel('Number of Products per Order')
        plt.ylabel('Frequency')
        plt.xlim(0, 80)
        st.pyplot(plot8)














elif not bool_eda:

    st.header("Reordering prediction")



    
    modelFile = st.file_uploader("Please upload the model export file [..._model.joblib] here", type="joblib", max_upload_size=1000)
    
    if modelFile is None:
        st.info("Waiting for model...")

    else:
        st.divider()
        bool_pred = True
        model = joblib.load(modelFile)





    if bool_pred:

        addToCartOrder = st.number_input("Product position in the cart", min_value=1)
        orderNumber = st.number_input("User's order sequence number", min_value=1)
        daysSincePriorOrder = st.number_input("Number of days since last order", min_value=0)
        productBuysCount = st.number_input("Number of times this product was bought in total", min_value=1)

        if st.button("Predict reorder"):
            inputData = pd.DataFrame({"add_to_cart_order": [addToCartOrder], "order_number": [orderNumber], "days_since_prior_order": [daysSincePriorOrder], "product_buys_count": [productBuysCount]})
            prediction = model.predict(inputData)
            
            if prediction[0] == 0.0:
                st.warning("This product will probably not be reordered.")
            if prediction[0] == 1.0:
                st.success("This product will probably be reordered.")