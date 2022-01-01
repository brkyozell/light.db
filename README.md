# light.db
Node.js tabanlı şifrelenmiş veritabanı

## Fonksiyonlar
### createLightbase(file, key, type)
| Argümanlar | Gerekli | Tür            | Açıklama                                                                                                        |
|------------|---------|----------------|-----------------------------------------------------------------------------------------------------------------|
| file       | Evet    | String         | Kaydedilecek dosya ismi                                                                                         |
| key        | Evet    | String         | Veritabanını açmak için gereken şifre.                                                                          |
| type       | Evet    | "{}" veya "[]" | Veritabanına ilk olarak {} mi yoksa [] mi yazılacağına karar verir.                                             |

```js
createLightbase("Veritabanım.lightbase", "123", "{}")
```

> Unutmayın, eğer veritabanı şifrenizi kaybederseniz verilerinize sonsuza dek erişemezsiniz(uzun bir süre!)

### connect(file, key)
| Argümanlar | Gerekli | Tür    | Açıklama                   |
|------------|---------|--------|----------------------------|
| file       | Evet    | String | Dosya adı                  |
| key        | Evet    | String | Veritabanına koyulan şifre |

```js
connect("Veritabanım.lightbase", "123")
```

### destroyConnection()

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** (Eğer varsa) bağlantıyı keser.

### readDatabase()

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Tüm veritabanı dosyasını return eder.

### set(value1, value2)

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Veri tanımlar, eğer tanımlanmışsa üzerine yazar.

| Argümanlar | Gerekli | Tür    | Açıklama           |
|------------|---------|--------|--------------------|
| value1     | Evet    | String | Veri tanımlayıcısı |
| value2     | Evet    | String | Verinin kendisi    |

```js
set("EnSevdigimLevye", "Çilek")
set("ZulaOynamayan", "VatanHaini")
set("Yapimci", [])
set("FonksiyonSayisi", 12)
```

### fetch(value)

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Veritabanından veri çeker.

| Argümanlar | Gerekli | Tür    | Açıklama |
|------------|---------|--------|----------|
| value      | Evet    | String | Veri adı |

```js
fetch("EnSevdigimLevye") // 'Çilek'
```

### delete(value)
> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Veritabanından veriyi siler.


| Argümanlar | Gerekli | Tür    | Açıklama |
|------------|---------|--------|----------|
| value      | Evet    | String | Veri adı |

```js
delete("ZulaOynamayan")
```

### subtract(value1, value2)

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Veriyi belli bir sayı düşürür.

| Argümanlar | Gerekli | Tür             | Açıklama                      |
|------------|---------|-----------------|-------------------------------|
| value1     | Evet    | String          | Veri tanımlayıcısı            |
| value2     | Evet    | Number          | Veriden ne kadar düşüreleceği |

```js
subtract("FonksiyonSayisi", 2)
```

### add(value1, value2)

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Veriyi belli bir sayı arttırır.

| Argümanlar | Gerekli | Tür             | Açıklama                       |
|------------|---------|-----------------|--------------------------------|
| value1     | Evet    | String          | Veri tanımlayıcısı             |
| value2     | Evet    | Number          | Veriden ne kadar arttırılacağı |

```js
add("FonksiyonSayisi", 1)
```

### push(value1, value2)

> Bu fonksiyonu kullanmak için hazırda var olan bir veritabanına bağlanmanız gerekir(bkz. connect fonksiyonu)

**Açıklama:** Array'ın içine veri ekler.

| Argümanlar | Gerekli | Tür             | Açıklama                                             |
|------------|---------|-----------------|------------------------------------------------------|
| value1     | Evet    | String          | Seçilen array. Eğer dosyaya ise veri tanımlayıcısı   |
| value2     | Hayır   | String          | Eğer array'a ise veri tanımlayıcısı.                 |

```js
push("Yapimci", "brkyozell")
```

### version()

**Açıklama:** Versiyon bilgisini verir.


## İletişim
Discord: brkyozell#4455
