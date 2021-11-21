import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AuthService } from 'projects/dashboard/src/app/shared/services/auth.service';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.scss']
})
export class InvoiceTemplateComponent implements OnInit {
  shop_logo: string = "https://bincommerzstaticstorage.blob.core.windows.net/imagesdev/bincommerzlogo_white.png";
  invoice_id: string = "";

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getShopInfoObservable().subscribe((shopinfo) => {
      this.shop_logo ='./assets/images/bincom-black.png';
      this.invoice_id = shopinfo.id;
    });
  }

  downloadInvoice(): void {
    let PDF = new jsPDF('p', 'mm', 'a4');
    var shopLogo = new Image();
    shopLogo.src = this.shop_logo;
    console.log(shopLogo.height);
    PDF.addImage(this.shop_logo, 'png', 10, 5, 40, 0);
    PDF.setLineWidth(0.20); 
    PDF.line(0, 35, 560, 35);
    PDF.setFontSize(12);
    PDF.text(`Invoice ID: ${this.invoice_id}`, 14, 45);

    let head = [['ID', 'Country', 'Rank', 'Capital']]

    let data = [
      [1, 'Finland', 7.632, 'Helsinki'],
      [2, 'Norway', 7.594, 'Oslo'],
      [3, 'Denmark', 7.555, 'Copenhagen'],
      [4, 'Iceland', 7.495, 'Reykjavík'],
      [5, 'Switzerland', 7.487, 'Bern'],
      [9, 'Sweden', 7.314, 'Stockholm'],
      [73, 'Belarus', 5.483, 'Minsk'],
    ];

    (PDF as any).autoTable({
      head: head,
      body: data,
      theme: 'grid',
      didDrawCell: data => {
        console.log(data.column.index)
      },
      startX: 50,
      startY: 50
    });

    let finalY = (PDF as any).lastAutoTable.finalY;
    PDF.text(`Total: 0 Tk`, 175, finalY + 10);

    PDF.save('angular-demo.pdf');

    // let invoiceContainer = document.getElementById('invoiceContainer');
    //   // const headerRow = document.createElement('div');
    //   // headerRow.setAttribute('class', 'row');
    //   // const logoCol = document.createElement('div');
    //   // logoCol.setAttribute('class', 'col-6')
    //   // const logo = document.createElement('img');
    //   // logo.setAttribute('src', 'https://bincommerzstaticstorage.blob.core.windows.net' + shopinfo.logo)
    //   // logo.style.width = '200px';

    //   // logoCol.appendChild()
    //   // headerRow.appendChild(logoCol);

    //   // invoiceContainer.appendChild()
    
    //   html2canvas(invoiceContainer, {useCORS: true}).then(canvas => {   
    //       // let fileWidth = 208;
    //       // let fileHeight = canvas.height * fileWidth / canvas.width;
          
    //       // const FILEURI = canvas.toDataURL('image/png')
    //       // let PDF = new jsPDF('p', 'mm', 'a4');
    //       // let position = 0;
    //       // PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
          
    //       // PDF.save('angular-demo.pdf');
    //   });
  }
}
