"""TechZone AI Career Navigator backend."""

from __future__ import annotations

from flask import Flask, jsonify, render_template, request

from recommendation_engine import get_recommendations, validate_catalogues

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400

    try:
        result = get_recommendations(data)
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:  # pragma: no cover - defensive validation
        return jsonify({"error": f"Unable to generate recommendations: {exc}"}), 400

    return jsonify(result)


@app.route("/health")
def health():
    validate_catalogues()
    return jsonify({"status": "ok", "catalogue": "validated"})


if __name__ == "__main__":
    validate_catalogues()
    app.run(debug=True, host="0.0.0.0", port=5000)
