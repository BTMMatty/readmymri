from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/v1/health')
def health():
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'services': {
            'api': 'up',
            'database': 'up',
            'storage': 'up'
        }
    })

@app.route('/v1/dicom/upload', methods=['POST'])
def upload():
    return jsonify({
        'anonymous_id': 'ANON_TEST123456789',
        'study_id': 'STUDY_ABC123',
        'status': 'processing'
    })

if __name__ == '__main__':
    app.run(port=8001, debug=True)  # Changed to 8001
