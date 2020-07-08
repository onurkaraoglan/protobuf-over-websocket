# Protobuf Over WebSocket

Simple JavaScript code of protobuf over websocket.

## Protocol Buffer Compiler Installation

* Linux, using `apt` or `apt-get`, for example:

    `$ apt install -y protobuf-compiler`

    `$ protoc --version`  (Ensure compiler version is 3+)


* MacOS, using [Homebrew](https://brew.sh/):

    `$ brew install protobuf`

    `$ protoc --version`  (Ensure compiler version is 3+)

* Manual installation :

    You can visit [Download Protocol Buffers](https://developers.google.com/protocol-buffers/docs/downloads) page.

## Usage

After installation is complete, open terminal and change directory to folder location then run the command below

`protoc --js_out=import_style=commonjs,binary:./pb  protos/user.proto`

This command read the file `protos/user.proto` and produce a single output file, `pb/protos/user_pb.js`.


## Learn More

You can learn more below

[Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/).

[JavaScript Generated Code for Protobuf](https://developers.google.com/protocol-buffers/docs/reference/javascript-generated).

