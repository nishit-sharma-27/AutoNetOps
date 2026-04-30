import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os

class AnomalyDetector:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = "models/anomaly_detector.pkl"

    def train(self, data: pd.DataFrame):
        """Train anomaly detection model on historical telemetry data"""
        features = data[['cpu_usage', 'memory_usage', 'latency', 'packet_loss']]
        scaled_features = self.scaler.fit_transform(features)

        self.model = IsolationForest(contamination=0.1, random_state=42)
        self.model.fit(scaled_features)

        # Save model
        os.makedirs("models", exist_ok=True)
        joblib.dump(self.model, self.model_path)

    def detect(self, telemetry: dict) -> dict:
        """Detect anomalies in real-time telemetry"""
        if self.model is None:
            self.load_model()

        features = np.array([[telemetry['cpu_usage'], telemetry['memory_usage'],
                            telemetry['latency'], telemetry['packet_loss']]])
        scaled_features = self.scaler.transform(features)

        prediction = self.model.predict(scaled_features)
        anomaly_score = self.model.decision_function(scaled_features)

        return {
            "is_anomaly": prediction[0] == -1,
            "anomaly_score": float(anomaly_score[0]),
            "confidence": float(abs(anomaly_score[0]))
        }

    def load_model(self):
        """Load pre-trained model"""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
        else:
            raise FileNotFoundError("Model not found. Please train the model first.")