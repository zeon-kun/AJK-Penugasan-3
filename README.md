# AJK-Penugasan-3
Penugasan 3 Open Recruitment Admin Lab AJK

## Setting up the Project
### Cloning the blue-green-deployment repo
```
git clone https://github.com/arsitektur-jaringan-komputer/blue-green-deployment.git
```

## Section 2
### Membuat docker image dari blue deployment
#### * Pertama-tama, kita ingin agar Node.js dapat dimasukkan ke dalam docker container

> Kita ubah package.json dalam folder blue menjadi:
``` Volt
{
  "name": "blue",
  "version": "1.0.0",
  "description": "blue server",
  "main": "blue.js",
  "scripts": {
    "start": "node blue.js"
  },
  "dependencies": {
    "body-parser": "~1.0.1",
    "express": "~4.0.0"
  }
}
```

#### * Lalu, kita buat file baru bernama `Dockerfile` ke directory yang sama seperti package.json tersebut. Isi Dockerfile:
> Kita gunakan image Docker yang berisi versi terbaru dari Node.js
``` Volt
FROM node:latest
```

> Lalu kita tentukan working directory di dalam image docker. Umumnya, kita gunakan `/usr/src/app` untuk menyimpan kode aplikasi Node.js
``` Volt
WORKDIR /usr/src/app
```

> Lalu kita salin file `package.json` ke dalam working directory di image docker karena file tersebut dibutuhkan untuk menginstall dependencies aplikasi Node.js yang dibutuhkan.
``` Volt
COPY package*.json ./
```

> Lalu kita jalankan perintah `npm install` untuk menginstall dependencies aplikasi Node.js yang dibutuhkan. Perinah dijalankan pada saat proses build image Docker
``` Volt
RUN npm install
```

> Lalu kita salin seluruh isi directory lokal ke dalam working directory dalam image docker
``` Volt
COPY . .
```

> Lalu kita tentukan port yang akan digunakan dalam aplikasi Node.js. Berdasarkan file `blue.js` kita akan gunakan port 8081
![image](https://user-images.githubusercontent.com/91377782/222944596-9cf64b92-bc61-4b22-a006-724700401a20.png)
``` Volt
EXPOSE 8081
```

> Terakhir kita tentukan perintah yang akan dijalankan saat container Docker berjalan. Perintah ini akan menjalankan file `blue.js` menggunakan Node.js
``` Volt
CMD [ "node", "blue.js" ]
```

#### * Kita juga buat `.dockerignore` yang berada di directory yang sama seperti `Dockerfile`. Tujuannya ialah untuk mencegah modul lokal dan log debug disalin ke Docker image dan mungkin menimpa modul yang di pasang di image kita. Isi file:

``` Volt
node_modules
npm-debug.log
```

#### * Setelah semua file dibuat, lalu kita akan build the Docker image. 
``` Volt
docker build . -t blue/node-web-app
```
> Lalu kita check docker imagesnya dengan `docker images`
![image](https://user-images.githubusercontent.com/91377782/222944968-66531e3f-3ca2-482d-93ee-cbceea8b8432.png)

> Sudah terbentuk image baru bernama `blue/node-web-app`

#### * Lalu kita run image tersebut dengan syntax
``` Volt
docker run -p 8081:8081 -d blue/node-web-app
```
###### Maksud dari code tersebut adalah

> `docker run` merupakan perintah untuk menjalankan sebuah container Docker
> `-p 8081:8081` merupakan mapping port antara container dan host. Port 8081 pada container akan di expose ke port 8081 pada host
> `-d` akan menjalankan container pada mode detached (background)
> `blue/node-web-app` merupakan nama image yang akan digunakan untuk menjalankan container. 

#### * Setelah itu kita bisa cek container apa yang sedang running dengan syntax `docker ps`, hasilnya adalah:
![image](https://user-images.githubusercontent.com/91377782/222945266-31a95627-9e38-4ee2-9547-89138e86264a.png)

#### * Maka images blue/node-web-app berhasil dijalankan. Lalu, kita coba buka di `http://localhost:8081/penugasan3`

![image](https://user-images.githubusercontent.com/91377782/222945308-72e0088a-032a-41b1-af73-c831fb4347df.png)

#### Telah muncul message `Halo Camin - I'm BLUE"` maka images berhasil dijalankan









Panduan mendownload dari docker 

``` 
https://hub.docker.com/r/kalyanaalk/blue-deployment 
```
```
https://hub.docker.com/r/kalyanaalk/green-deployment
```
## Section 3
