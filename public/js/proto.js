var amountLeft = 44;//get from API
window.addEventListener('load', function(){
  $('buy-amount').addEventListener('change', function(e){
    if (this.value < 1) {
      console.log('no less than 1');
      e.preventDefault();
      this.value = 1;
    }
    $('amount-tickets-left').innerHTML = amountLeft - this.value;
  })
});
$ = function(id){
  return document.getElementById(id);
}
