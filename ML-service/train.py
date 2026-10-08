from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import joblib


housing = fetch_california_housing()

print(housing.data.shape, housing.target.shape) # type: ignore
print(housing.feature_names) # type: ignore
print(housing.data[:3]) # type: ignore
print(housing.target[:3]) # type: ignore


X = housing.data # type: ignore
y = housing.target # type: ignore

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
print("Training data:", X_train.shape)
print("Testing data:", X_test.shape)

model = LinearRegression()

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("First 5 predictions:", predictions[:5])
print("Actual values:", y_test[0:5])

mae = mean_absolute_error(y_test, predictions)


print("Mean Absolute Error:", mae)

joblib.dump(model, "model.joblib")
print("Model saved successfully.")