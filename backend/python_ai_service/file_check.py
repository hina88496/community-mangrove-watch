from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/checkfile", methods=["POST"])
def check_file():
    data = request.get_json()
    file_path = data.get("filePath")
    
    # Dummy AI check: accept image/video/pdf
    allowed_ext = ['.png', '.jpg', '.jpeg', '.mp4', '.mov', '.pdf']
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext in allowed_ext:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "rejected"})

if __name__ == "__main__":
    app.run(port=8000)
