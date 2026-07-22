import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import Adam

# DATASET PATH

train_dir = "dataset/train"

# IMAGE PREPROCESSING

train_datagen = ImageDataGenerator(

    rescale=1./255,

    validation_split=0.2

)

# TRAIN DATA

train_data = train_datagen.flow_from_directory(

    train_dir,

    target_size=(224, 224),

    batch_size=32,

    class_mode='categorical',

    subset='training'

)

# VALIDATION DATA

val_data = train_datagen.flow_from_directory(

    train_dir,

    target_size=(224, 224),

    batch_size=32,

    class_mode='categorical',

    subset='validation'

)

# LOAD PRETRAINED MOBILENET

base_model = MobileNetV2(

    weights='imagenet',

    include_top=False,

    input_shape=(224, 224, 3)

)

# FREEZE BASE MODEL

base_model.trainable = False

# BUILD MODEL

model = models.Sequential([

    base_model,

    layers.GlobalAveragePooling2D(),

    layers.Dense(

        128,

        activation='relu'

    ),

    layers.Dropout(0.3),

    layers.Dense(

        train_data.num_classes,

        activation='softmax'

    )

])

# COMPILE MODEL

model.compile(

    optimizer=Adam(

        learning_rate=0.001

    ),

    loss='categorical_crossentropy',

    metrics=['accuracy']

)

# TRAIN MODEL

model.fit(

    train_data,

    validation_data=val_data,

    epochs=5

)

# SAVE MODEL

model.save(

    "model/model.h5"

)

print(

    "MobileNetV2 model trained and saved!"

)