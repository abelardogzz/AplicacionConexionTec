function Project(p_name, p_imageURL, p_owner, p_description){
  // Class Attributes.
  this.name = (typeof p_name === 'string') ? p_name : "Name";
  this.image = (typeof p_imageURL === 'string') ? p_imageURL : "ImageURL";
  this.owner = (typeof p_owner === 'string') ? p_owner : "Owner";
  this.description = (typeof p_description === 'string') ? trim_description(p_description) : "Description";

  // Class methods.
}

function trim_description(p_description){
  // Cuts the description into a shorter text.
  if (p_description.length >= 20){
    return p_description.substr(0, 20) + "...";
  }
  else{
    return p_description
  }
}
