# AJK-Penugasan-3
Penugasan 3 Open Recruitment Admin Lab AJK

## Setting up the Project
### Cloning the blue-green-deployment repo
```
git clone https://github.com/arsitektur-jaringan-komputer/blue-green-deployment.git
```

## Docker
### Membuat docker image dari green dan blue deployment, dengan contoh docker image dari green deployment
#### Pembuatan docker image green deployment memiliki langkah - langkah yang sama dengan pembuatan docker image blue deployment
#### * Langkah pertama, masukkan kode berikut ke dalam package.json
``` Volt
"scripts": {
    "start": "node green.js"
 }
 ```
 
> Sehingga package.json akan berbentuk seperti

``` Volt
{
    "name": "green",
    "version": "1.0.0",
    "description": "green server",
    "main": "green.js",
    "dependencies": {
        "body-parser": "^1.20.2",
        "express": "^4.18.2"
    },
    "scripts": {
        "start": "node green.js"
    }
}
```

#### * Langkah kedua, `Dockerfile` dibentuk. Berikut merupakan isi dari `Dockerfile`:
> Langkah pertama, pada penggunaan `Dockerfile` ini, digunakan node dengan versi 14
``` Volt
FROM node:14
```
> Langkah kedua, ditentukan work directory. Pada `Dockerfile` ini, digunakan `/app` sebagai tempat eksekusi command
``` Volt
WORKDIR /app
```
> Langkah selanjutnya adalah menuliskan command COPY ke dalam `Dockerfile`. Command COPY ditulis sebagai berikut dikarenakan `package.json` disalin ke dalam working directory di docker image. Format penulisan commmand dan implementasi command COPY adalah sebagai berikut dan
``` Volt
COPY <src> <dest>
COPY package.json ./
```
> Langkah keempat, di dalam `Dockerfile` diinstall npm untuk mendapatkan dependencies yang dibutuhkan oleh Node.js
``` Volt
RUN npm install
```
> Langkah kelima, command berikut digunakan untuk menyalin semua file yang ada di direktori saat ini (.) pada host ke direktori kerja saat ini (.) di dalam container.
``` Volt
COPY . .
```
> Langkah keenam, digunakan port 8081 dalam menjalankan container ini. Penggunaan port 8081 sesuai dengan yang tertulis di file javascript. Berikut merupakan contoh screenshot penggunaan port yang tertulis di `green.js` dan juga command yang digunakan di dalam `Dockerfile`
![image](https://user-images.githubusercontent.com/110476969/223018179-3c0fadab-f6e0-43e8-9568-9bbc6534f502.png)
``` Volt
EXPOSE 8081
```
> Langkah terakhir adalah penulisan command CMD. Command ini digunakan untuk menspesifikasi command supaya dapat dieksekusi saat Docker container dimulai. Dalam hal ini, command berikut akan dieksekusi untuk memulai Node.js yang tertulis di `package.json`
``` Volt
CMD [ "npm", "start" ]
```

#### * Langkah berikutnya, melakukan build pada docker image
> Berikut merupakan command yang dipakai untuk melakukan build docker image
``` Volt
docker build -t green:latest .
```
> Setelah itu, maka didapatkan docker image yang telah terbuild. Untuk melihat docker image yang ada, bisa dengan melakukan pengecekan menggunakan command berikut
``` Volt
docker images
```
> Didapatkan docker image yang sudah dibuild seperti berikut
![image](https://user-images.githubusercontent.com/110476969/223020516-36fbef47-5280-462c-83f6-d63cb0d93335.png)


#### * Selanjutnya, docker image akan di-run sehingga dapat dibuat docker container
> Berikut merupakan command yang digunakan untuk melakukan run pada docker image
```Volt
docker run -p 8081:8081 green:latest
```
> Setelah itu, dapat dicek docker container dengan command berikut
``` Volt
docker ps -a
```
> Sehingga docker container yang telah dibuild akan muncul seperti berikut
![image](https://user-images.githubusercontent.com/110476969/223021060-292e736a-6efc-42aa-bf72-5e7f9bc5781a.png)


#### * Langkah terakhir adalah melihat docker container yang telah dibuild dalam `http://localhost:8081/penugasan3`. Hasilnya adalah seperti berikut:
![image](https://user-images.githubusercontent.com/110476969/223021231-9bbd98e0-eaab-4a9b-abcc-ea99dbeac701.png)
> Dengan keluarnya output seperti ini, maka docker container berhasil dibuat


### DockerHub

Panduan mendownload dari docker 

``` 
https://hub.docker.com/r/kalyanaalk/blue-deployment 
```
```
https://hub.docker.com/r/kalyanaalk/green-deployment
```
## S3
### Membuat Bucket
Dalam Amazon S3 setiap objek selalu disimpan pada sebuah 'bucket'. Maka dari itu sebelum memasukkan data pada amazon S3 terlebih dahulu harus membuat bucket terlebih dahulu.
#### * 1. Sign in dan buka Amazon S3 console

#### * 2. Masuk pada menu bucket menggunakan fitur pencarian amazon kemudian create bucket
Pada kolom pencarian yang ada pada konsole ketikkan buckets kemudian klik fitur buckets, setelahnya dapat langsung create bucket. Tampilan search adalah seperti gambar berikut:
<img width="1280" alt="Screenshot 2023-03-08 070802" src="https://user-images.githubusercontent.com/108170210/223585317-1f631514-dc4c-4e9a-90f7-bef7d12fe631.png">

#### * 3. Masukkan informasi bucket seperti nama regian dan konfigurasi lain lainnya
Ada beberapa peraturan yang harus diikuti dalam pengisian nama bucket yaitu :
- Memiliki partisi unik. Partisi adalah pengelompokan Wilayah. AWS saat ini memiliki tiga partisi: aws (Standard Regions), aws-cn (China Regions), dan aws-us-gov (AWS GovCloud [US] Regions).
- Rentang nama antara 3-63 karakter panjangnya
- Hanya terdiri dari huruf kecil, angka, titik (.), dan tanda hubung (-).
- Dimulai dan berakhir dengan huruf atau angka

Berikut konfigurasi lainnya
- Untuk Region, pilih Wilayah AWS tempat Anda ingin bucket berada. Disini digunakan Asia Pacific (Singapore) ap-southeast-1 sesuai permintaan soal.
- Untuk Object Ownership pilih opsi recomended ACLs disabled.
- Pada section Block Public Access settings for this bucket hanya centang pada opsi Block public and cross-account access to buckets and objects through any public bucket or access point policies. Jangan lupa untuk menyetujui pesan warning.
- Selebihnya biarkan deafult
Kemudian klik create bucket
Setelah semua informasi terbuat maka diperoleh hasil sebagai berikut :
<img width="889" alt="Screenshot 2023-03-08 072103" src="https://user-images.githubusercontent.com/108170210/223586724-d551b6dd-f93f-473b-a732-26f6dfda7951.png">

### Membuat Konfigurasi YAML
Konfigurasi YAML digunakan untuk otomatisasi docker blue and green build dari codebuildnya. Berikut adalah isi file oprec.yml
```
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...          
      - docker build -t $IMAGE_REPO_NAME:blue ./blue/
      - docker build -t $IMAGE_REPO_NAME:green ./green/
      - docker tag $IMAGE_REPO_NAME:blue $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:blue
      - docker tag $IMAGE_REPO_NAME:green $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:green
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:blue
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:green
```
File YAML di atas adalah file konfigurasi untuk melakukan build dan push Docker image ke Amazon ECR menggunakan AWS CodeBuild. File tersebut terdiri dari tiga fase:

1. Pre_build: Fase ini menjalankan perintah untuk login ke Amazon ECR menggunakan AWS CLI dan Docker. Pada fase ini, AWS CLI akan digunakan untuk mendapatkan password yang dibutuhkan untuk login ke ECR, dan perintah Docker login akan dijalankan dengan menggunakan username AWS dan password yang didapatkan dari AWS CLI.

2. Build: Fase ini digunakan untuk membangun Docker image. Pada fase ini, beberapa perintah yang dijalankan adalah mencetak pesan build started on date, membangun Docker image menggunakan perintah Docker build, dan menandai Docker image dengan nama yang sesuai.

3. Post_build: Fase ini digunakan untuk mendorong Docker image ke Amazon ECR. Pada fase ini, perintah untuk mencetak pesan build completed on date akan dijalankan, kemudian Docker image akan di-push ke ECR menggunakan perintah Docker push.

### Mengupload object ke bucket
Setelah membuat bucket di Amazon S3, Anda siap mengunggah objek ke bucket. Objek dapat berupa file apa saja: file teks, foto, video, dan sebagainya.
Langkah memasukkan object pada bucket adalah sebagai berikut :
1. Di daftar Bucket, pilih nama bucket tempat kita ingin mengunggah objek.
2. Pada tab Objek untuk bucket, pilih Unggah.
3. Di bawah File dan folder, pilih Tambahkan file.
4. Pilih file untuk diunggah, lalu pilih open.
5. Kemudian Upload
<img width="751" alt="Screenshot 2023-03-08 074039" src="https://user-images.githubusercontent.com/108170210/223589179-4bcd6637-fe22-4f0b-bda9-9b9c8e0578ba.png">
Setelahnya nama akan tampak pada daftar file di bucket sebagai berikut :
<img width="1152" alt="Screenshot 2023-03-08 074141" src="https://user-images.githubusercontent.com/108170210/223589301-f0b884b5-8a5b-49f4-a090-c9280ae4f11d.png">

## Code Build
Untuk melakukan run CodeBuild dapat langsung masuk ke service CodeBuild.

### Create Build project
Pada fitur create CodeBuild yang diubah adalah beberapa bagian yaitu 
1. Project configuration
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/108170210/224338476-1c510374-df4a-4c71-bb42-dffba71a801b.png">

2. Source
Sesuai dengan infrastruktur AWS di penugasan. Maka sumber dari codebuild adalah yang terletak pada bucket s3. Sehingga isian bagaian ini adalah sebagai berikut :
<img width="750" alt="image" src="https://user-images.githubusercontent.com/108170210/224337601-3497c2af-f212-46e9-af34-e0f2a40f5e19.png">

3. Environment

    a. Untuk Operating system, pilih Ubuntu.
    
    b. Untuk Runtime, pilih Standard.
    
    c. Untuk Image, pilih aws/codebuild/standard:4.0.
    
    d. Karena digunakan untuk build project to build a Docker image, maka checklist juga bagian Privileged.
    
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/108170210/224335369-c7adddd9-a9f0-4b65-a722-cce7a47fabd6.png">

    e. Pada bagian environment juga tambahkan Environment variables berikut :
    
        - AWS_DEFAULT_REGION dengan value region-ID
        
        - AWS_ACCOUNT_ID dengan value account-ID
        
        - IMAGE_REPO_NAME dengan value Repositori pada ECR
        
<img width="750" alt="image" src="https://user-images.githubusercontent.com/108170210/224335636-a5221b9e-f633-47de-b615-dd4995dcf80c.png">

Selebihnya dari ketiga section tersebut biarkan deafult. Berikut adalah hasil dari create codebuild yang sudah sukses
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/108170210/224334161-4cdf40fb-9490-4aad-a9f1-57820ec9c022.png">

### Start Build 
Setelah di create maka langkah selanjutnya adalah build. Dapat dilakukan dengan masuk ke Codebuild yang sudah dibuat dan klik start build.
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/108170210/224343381-b27cc7e1-66d6-422f-b819-93f265baf86f.png">
Hasil build codebuild dapat dilihat pada bagian build history sebagai berikut:
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/108170210/224343855-5dde8607-f1d5-4d8b-8851-4a5af209c2bf.png">


## Pembuatan ECR
ECR dibuat sebagai tempat repository untuk pengerjaan di codebuild 
<img width="1280" alt="image" src="https://github.com/AlfaDitoOnGithub/Priv/blob/main/Screenshot_31.png">
diatas adalah repo terakhir yang digunakan untuk codebuild.
Repo berisi image dari hasil build CodeBuild
<img width="1280" alt="image" src="https://github.com/AlfaDitoOnGithub/Priv/blob/main/Screenshot_34.png">

Konfigurasi untuk repositorinya sendiri adalah sebagai berikut
<img width="1280" alt="image" src="https://github.com/AlfaDitoOnGithub/Priv/blob/main/Screenshot_32.png">
<img width="1280" alt="image" src="https://github.com/AlfaDitoOnGithub/Priv/blob/main/Screenshot_33.png">



