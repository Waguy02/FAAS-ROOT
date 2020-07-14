from django.shortcuts import render

# Create your views here.
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
from django.template.context_processors import csrf
from crispy_forms.utils import render_crispy_form
from PIL import Image
from django.core.files.storage import FileSystemStorage
from tensorflow.keras.models import load_model
from keras.preprocessing import image
import numpy as np
import  tensorflow as tf

# Imaginary function to handle an uploaded file.
def handle_uploaded_file(file_):
    print(file_)
    Image.open(file_)
    fs = FileSystemStorage()
    filename = fs.save(file_.name, file_)
    return filename
def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            filename = handle_uploaded_file(request.FILES['file_'])
            file_url = './media/'+filename    
            status = get_image_status(file_url)
            return render(request, 'image.html', {'file_url': file_url, 'status':status})
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})


def get_image_status(img_url):
    model_load = load_model('./model_tf/masked_and_unmasked.h5')
    img = image.load_img(img_url, target_size=(150, 150))
    img_tensor = image.img_to_array(img)
    #img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.
    print(model_load.predict(np.array([img_tensor])))
    ind_class = model_load.predict_classes(np.array([img_tensor]))[0][0]
    
    status = 'INDIVIDU MASQUE' if ind_class == 0 else 'INDIVIDU NON MASQUE'
    return status