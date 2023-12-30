package com.your_project_name;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNativeModule extends ReactContextBaseJavaModule {
  public MyNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MyNativeModule";
  }

  @ReactMethod
  public void showToast(String message) {
    Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
  }

  @ReactMethod
  public void setWallpaper(String base64Image){
     try {
        WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());

        // Convert base64 string to Bitmap
        byte[] decodedBytes = Base64.decode(base64Image, Base64.DEFAULT);
        InputStream inputStream = new ByteArrayInputStream(decodedBytes);
        Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

        wallpaperManager.setBitmap(bitmap);
    } catch (IOException e) {
        e.printStackTrace();
    }
  }
}