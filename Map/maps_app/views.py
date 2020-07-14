from django.shortcuts import render
from django.views.generic.base import TemplateView

class MapView(TemplateView):
    template_name = 'MapsCard.html'
    def get_context_data(self, **kwargs):
        context = super(MapView, self).get_context_data(**kwargs)
        context['mapbox_access_token'] = 'pk.eyJ1IjoibnlhdCIsImEiOiJja2JzZGh0ZmIwMGpwMnB0NzI2ZXF6emhhIn0.Z5zTkQrHUsMa8oHXSDCgqw'
        return context

"""def default_map(request):
    return render(request, 'default.html', {})
https://api.mapbox.com/datasets/v1/nyat/{dataset_id}?access_token=pk.eyJ1IjoibnlhdCIsImEiOiJja2JzZGh0ZmIwMGpwMnB0NzI2ZXF6emhhIn0.Z5zTkQrHUsMa8oHXSDCgqw"""